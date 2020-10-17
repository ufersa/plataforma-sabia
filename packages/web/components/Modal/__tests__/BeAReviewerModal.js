import React from 'react';
import fetchMock from 'fetch-mock-jest';
import { act } from '@testing-library/react-hooks';

import { render, screen, fireEvent } from 'test-utils';
import BeAReviewerModal from '../BeAReviewerModal';
import * as useAuth from '../../../hooks/useAuth';

const closeModalMock = jest.fn();

const mockTaxonomies = () =>
	fetchMock.get('path:/taxonomies', {
		status: 200,
		body: [
			{
				taxonomy: 'category',
				terms: [
					{ id: 123, term: 'Fake Taxonomy' },
					{ id: 456, term: 'Second Taxonomy' },
				],
			},
		],
	});

const mockCategories = () =>
	fetchMock.get('path:/taxonomies/category/terms', {
		status: 200,
		body: [
			{ id: 321, term: 'Fake Subcategory' },
			{ id: 654, term: 'Second Subcategory' },
		],
	});

const mockSubmit = () => fetchMock.post('path:/reviewers', { status: 200, body: { ok: true } });

describe('<BeAReviewerModal />', () => {
	beforeEach(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	it('should render correctly', async () => {
		fetchMock.get('path:/taxonomies', {
			status: 200,
			body: {
				category: {
					terms: [
						{
							term: 'Fake Taxonomy',
							id: '123',
						},
					],
				},
			},
		});

		render(<BeAReviewerModal closeModal={closeModalMock} />);

		expect(await screen.findAllByRole('textbox')).toHaveLength(2);
		expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /enviar solicitação/i })).toBeInTheDocument();
	});

	it('should be able to add category and sub-category to selected list and remove it', async () => {
		mockTaxonomies();
		mockCategories();
		mockSubmit();

		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				id: 12345,
			},
		});

		render(<BeAReviewerModal closeModal={closeModalMock} />);

		const categoryInput = await screen.findByLabelText('Área de atuação');
		const subCategoryInput = await screen.findByLabelText('Subárea de atuação');

		// Submit button should be disabled if no item is selected
		let submitBtn = await screen.findByRole('button', { name: /enviar solicitação/i });
		expect(submitBtn).toBeDisabled();

		// Add the first combination to selected list
		act(() => {
			fireEvent.change(categoryInput, { target: { value: 'Fake Taxonomy' } });
			fireEvent.keyDown(categoryInput, { key: 'Enter', keyCode: 13 });
		});

		let addBtn = await screen.findByRole('button', { name: /adicionar/i });
		expect(addBtn).toBeDisabled();

		act(() => {
			fireEvent.change(subCategoryInput, { target: { value: 'Fake Subcategory' } });
			fireEvent.keyDown(subCategoryInput, { key: 'Enter', keyCode: 13 });
		});

		expect(addBtn).toBeEnabled();

		// Clicking add button twice should not duplicate lines
		fireEvent.click(addBtn);
		fireEvent.click(addBtn);
		expect(screen.getAllByText(/fake taxonomy/i)).toHaveLength(2);
		expect(screen.getAllByText(/fake subcategory/i)).toHaveLength(2);

		// Add the second combination to selected list
		act(() => {
			fireEvent.change(categoryInput, { target: { value: 'Second Taxonomy' } });
			fireEvent.keyDown(categoryInput, { key: 'Enter', keyCode: 13 });
		});

		addBtn = await screen.findByRole('button', { name: /adicionar/i });
		expect(addBtn).toBeDisabled();

		act(() => {
			fireEvent.change(subCategoryInput, { target: { value: 'Second Subcategory' } });
			fireEvent.keyDown(subCategoryInput, { key: 'Enter', keyCode: 13 });
		});

		expect(addBtn).toBeEnabled();
		fireEvent.click(addBtn);
		expect(screen.getAllByText(/second taxonomy/i)).toHaveLength(2);
		expect(screen.getAllByText(/second subcategory/i)).toHaveLength(2);

		// Clicking remove button should only remove the clicked combination
		const removeBtns = screen.getAllByRole('button', { name: /remover/i });
		fireEvent.click(removeBtns[0]);
		expect(screen.queryByText(/fake taxonomy/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/fake subcategory/i)).not.toBeInTheDocument();

		expect(screen.queryAllByText(/second taxonomy/i)).toHaveLength(2);
		expect(screen.queryAllByText(/second subcategory/i)).toHaveLength(2);

		act(() => {
			fireEvent.click(submitBtn);
		});
		submitBtn = await screen.findByRole('button', { name: /enviar solicitação/i });
		expect(submitBtn).toBeEnabled();
		expect(closeModalMock).toHaveBeenCalledTimes(1);

		expect(screen.getByText(/sua solicitação foi enviada/i)).toBeInTheDocument();
	});
});
