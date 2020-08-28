import React from 'react';
import { Button } from '../components/Button';

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		children: {
			control: 'text',
		},
		onClick: {
			action: 'clicked',
		},
	},
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const ButtonStory = (args) => <Button {...args} />;

ButtonStory.args = {
	children: 'Button',
};
