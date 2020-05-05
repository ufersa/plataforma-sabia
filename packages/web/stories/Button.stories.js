import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/Button';

export default {
	title: 'Button',
	component: Button,
};

export const PrimaryVariant = () => <Button onClick={action('clicked')}>I am a button.</Button>;
export const SecondaryVariant = () => (
	<Button onClick={action('clicked')} variant="secondary">
		I am a button.
	</Button>
);
