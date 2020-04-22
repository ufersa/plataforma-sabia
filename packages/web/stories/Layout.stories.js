import React from 'react';
import Layout from '../components/layout';

export default {
	title: 'Layout',
	component: Layout,
};

export const Default = () => {
	return (
		<Layout>
			<h2>Layout Children</h2>
		</Layout>
	);
};
