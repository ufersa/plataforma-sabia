import { fireEvent, screen, render, waitForElementToBeRemoved, waitFor } from 'test-utils';
import * as Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import * as auth from '../../../services/auth';

import SignInForm from '..';

const fillFormAndSubmit = () => {
	fireEvent.change(screen.getByLabelText(/e-mail/i), {
		target: { value: 'test@test.com' },
	});
	fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password' } });
	fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
};

const spyOnRouter = () => {
	const mockPush = jest.fn();
	jest.spyOn(Router, 'useRouter').mockReturnValue({
		push: mockPush,
	});
	return mockPush;
};

const spyOnAuthLogin = (resolvedValue) => {
	jest.spyOn(auth, 'login').mockResolvedValue(resolvedValue);
};

describe('<SignInForm />', () => {
	it('should show a toast error after submit if account is unverified and redirect to confirm account page', async () => {
		const mockRouterPush = spyOnRouter();
		spyOnAuthLogin({
			error: { error_code: 'UNVERIFIED_EMAIL', message: 'Account is unverified dude' },
		});

		render(
			<>
				<ToastContainer />
				<SignInForm />
			</>,
		);

		fillFormAndSubmit();

		expect(await screen.findByText(/Account is unverified dude/i)).toBeInTheDocument();
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
		expect(mockRouterPush).toHaveBeenCalledWith('/confirmar-conta');
	});

	it('should show error from api after submit', async () => {
		spyOnAuthLogin({
			error: { message: 'Invalid credentials dude' },
		});
		render(<SignInForm />);

		fillFormAndSubmit();

		expect(await screen.findByText(/Invalid credentials dude/i)).toBeInTheDocument();
	});

	it('should clear previous error when submitting again', async () => {
		spyOnAuthLogin({
			error: { message: 'Invalid credentials dude' },
		});
		render(<SignInForm />);

		fillFormAndSubmit();

		expect(await screen.findByText(/Invalid credentials dude/i)).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
		waitForElementToBeRemoved(() => screen.getByText(/Invalid credentials dude/i));
		expect(await screen.findByText(/Invalid credentials dude/i)).toBeInTheDocument();
	});

	it('should redirect to a given page after a successful submit', async () => {
		const mockRouterPush = spyOnRouter();
		spyOnAuthLogin({
			success: true,
		});
		render(<SignInForm redirect="/given-page" />);

		fillFormAndSubmit();

		await waitFor(() => expect(mockRouterPush).toHaveBeenCalledTimes(1));
		expect(mockRouterPush).toHaveBeenCalledWith('/given-page');
	});

	it('should redirect to home after a successful submit', async () => {
		const mockRouterPush = spyOnRouter();
		spyOnAuthLogin({
			success: true,
		});
		render(<SignInForm />);

		fillFormAndSubmit();

		expect(await screen.findByRole('button', { name: /aguarde/i })).toBeInTheDocument();
		waitForElementToBeRemoved(() => screen.getByRole('button', { name: /aguarde/i }));
		expect(mockRouterPush).toHaveBeenCalledTimes(1);
		expect(mockRouterPush).toHaveBeenCalledWith('/');
	});

	it('should not redirect if inline property is passed', async () => {
		const mockRouterPush = spyOnRouter();
		spyOnAuthLogin({
			success: true,
		});
		render(<SignInForm redirect="/" inline />);

		await waitFor(() => expect(mockRouterPush).not.toHaveBeenCalled());
	});
});
