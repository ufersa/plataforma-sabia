import React from 'react';
import styled from 'styled-components';
import LoginContent from '../Modal/LoginModal';

const InlineLogin = () => (
	<Container>
		<LoginContent />
	</Container>
);

const Container = styled.div`
	padding: 2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default InlineLogin;
