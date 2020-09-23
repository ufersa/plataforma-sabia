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

const ButtonTemplate = args => <Button {...args} />;

export const ButtonStory = ButtonTemplate.bind({});

ButtonStory.args = {
	children: 'Button',
};
