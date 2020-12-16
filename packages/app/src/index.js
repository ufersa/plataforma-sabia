import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Container>
				<Text>Plataforma Sabiá - APP</Text>
			</Container>
		</>
	);
};

export default App;
