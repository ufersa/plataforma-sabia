import React from 'react';
import * as ReactTabs from 'react-tabs';
// import { useTechnology } from '../../hooks';

const Tabs = () => {
	// const { technology } = useTechnology();

	return (
		<ReactTabs.Tabs>
			<ReactTabs.TabList>
				<ReactTabs.Tab>Sobre a Tecnologia</ReactTabs.Tab>
				<ReactTabs.Tab>Caracterização</ReactTabs.Tab>
			</ReactTabs.TabList>

			<ReactTabs.TabPanel>
				<h2>Any content 1</h2>
			</ReactTabs.TabPanel>
			<ReactTabs.TabPanel>
				<h2>Any content 2</h2>
			</ReactTabs.TabPanel>
		</ReactTabs.Tabs>
	);
};

export default Tabs;
