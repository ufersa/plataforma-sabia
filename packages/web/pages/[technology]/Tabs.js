import React from 'react';
import { resetIdCounter } from 'react-tabs';
// import { useTechnology } from '../../hooks';

import { Tabs as Container, Tab, TabPanel, TabList } from '../../components/Tab';

const Tabs = () => {
	// const { technology } = useTechnology();

	return (
		<Container>
			<TabList>
				<Tab>Sobre a Tecnologia</Tab>
				<Tab>Caracterização</Tab>
				<Tab>Teste</Tab>
				<Tab>Testando</Tab>
			</TabList>

			<TabPanel>
				<h3>Any content 1</h3>
			</TabPanel>
			<TabPanel>
				<h3>Any content 2</h3>
			</TabPanel>
			<TabPanel>
				<h3>Any content 3</h3>
			</TabPanel>
			<TabPanel>
				<h3>Any content 3</h3>
			</TabPanel>
		</Container>
	);
};
Tabs.getInitialProps = () => {
	resetIdCounter();
};

export default Tabs;
