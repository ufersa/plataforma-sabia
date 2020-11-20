import fetchMock from 'fetch-mock-jest';
import React from 'react';
import { fireEvent, render, screen } from 'test-utils';
import * as useAuth from '../../../hooks/useAuth';
import BeAReviewerButton from '../BeAReviewerButton';

const mockReviewerUser = () =>
	fetchMock.get('path:/reviewer', {
		status: 200,
		body: {
			status: 'approved',
		},
	});

jest.mock('../../Modal/BeAReviewerModal', () => {
	return {
		__esModule: true,
		default: () => <div data-testid="beAReviewerModal" />,
	};
});

jest.mock('../../Modal/PendingUserDataModal', () => {
	return {
		__esModule: true,
		default: () => <div data-testid="pendingUserDataModal" />,
	};
});

describe('<BeAReviewerButton />', () => {
	mockReviewerUser();

	it('should render correctly', async () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {},
		});
		const { container } = render(<BeAReviewerButton />);

		expect(await screen.findByRole('button', { name: /seja um curador/i })).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render pending data modal when user hasnt completed registration', async () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				can_be_curator: false,
			},
		});
		render(<BeAReviewerButton />);

		fireEvent.click(await screen.findByRole('button', { name: /seja um curador/i }));

		expect(screen.getByTestId(/pendingUserDataModal/i)).toBeInTheDocument();
	});

	it('should render modal to choose categories when user has completed registration', async () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				can_be_curator: true,
			},
		});
		render(<BeAReviewerButton />);

		fireEvent.click(await screen.findByRole('button', { name: /seja um curador/i }));

		expect(screen.getByTestId('beAReviewerModal')).toBeInTheDocument();
	});
});
