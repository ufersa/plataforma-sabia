/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from 'test-utils';
import MessagesPage from '../../../../pages/user/my-account/messages';
import * as useAuth from '../../../../hooks/useAuth';

const props = {
	initialMessages: [],
	initialTotalPages: 0,
	initialTotalItems: 0,
	requestMessagesOptions: {},
};

describe('<Messages />', () => {
	it('should render empty screen if theres no messages', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
		});
		render(<MessagesPage {...props} />);

		expect(
			screen.getByText(/Você não possui mensagens para exibir até o momento/i),
		).toBeInTheDocument();
	});
});
