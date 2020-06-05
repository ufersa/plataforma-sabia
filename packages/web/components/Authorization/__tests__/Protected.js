import React from 'react';
import { useTranslation } from 'react-i18next';
import { render } from 'test-utils';
import { Protected } from '..';
import { useModal } from '../../../hooks';

jest.mock('../../../hooks', () => {
	return {
		__esModule: false,
		useModal: () => {
			return {
				openModal: jest.fn(),
				closeModal: jest.fn(),
			};
		},
		useAuth: () => {
			return {
				user: jest.fn(),
			};
		},
	};
});

test('it should not render children if user is not logged in', () => {
	const { t } = useTranslation(['common']);

	const { container } = render(
		<Protected>
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();

	const { openModal } = useModal();

	expect(openModal).toHaveBeenCalledWith('login', {
		message: t('common:signInToContinue'),
	});
});
