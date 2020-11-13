import React from 'react';
import * as Router from 'next/router';

import { render, screen, fireEvent } from 'test-utils';
import PendingUserDataModal from '../PendingUserDataModal';

const closeModalMock = jest.fn();

describe('<PendingUserDataModal />', () => {
	it('should render correctly', () => {
		const { container } = render(
			<PendingUserDataModal
				closeModal={closeModalMock}
				message="Complete o seu cadastro para..."
			/>,
		);

		expect(screen.getByRole('img')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should closeModal and redirect to /user/my-account when clicking go to profile button', () => {
		jest.spyOn(Router, 'useRouter').mockReturnValue({
			push: jest.fn(),
		});

		render(
			<PendingUserDataModal
				closeModal={closeModalMock}
				message="Complete o seu cadastro para..."
			/>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(Router.useRouter().push).toHaveBeenCalledWith('/user/my-account');
		expect(Router.useRouter().push).toHaveBeenCalledTimes(1);
		expect(closeModalMock).toHaveBeenCalledTimes(1);
	});
});
