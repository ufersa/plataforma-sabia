import React from 'react';
import { render, fireEvent } from 'test-utils';
import Share from '..';

describe('ShareModal component', () => {
	it('should open the sharing modal when clicking', () => {
		window.open = jest.fn();
		document.execCommand = jest.fn();

		const { container, getByRole, getByLabelText } = render(<Share />);

		const shareButton = getByRole('button', { name: 'share' });
		fireEvent.click(shareButton);

		const iconButtons = ['facebook', 'clipboard'];
		iconButtons.forEach((button) => {
			const clipboardButton = getByLabelText(button);
			fireEvent.click(clipboardButton);
		});

		expect(window.open).toHaveBeenCalledTimes(1);
		expect(window.open).toHaveBeenCalledWith(
			expect.stringMatching(/^[https://facebook.com/sharer/sharer.php?u=(.*)]/),
			'_blank',
			'noopener',
		);
		expect(document.execCommand).toHaveBeenCalledTimes(1);
		expect(container).toMatchSnapshot();
	});
});
