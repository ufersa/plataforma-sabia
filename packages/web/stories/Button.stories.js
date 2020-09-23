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
const ButtonTemplate = (args) => <Button {...args} />;

export const ButtonStory = ButtonTemplate.bind({});

ButtonStory.args = {
	children: 'Button',
};
