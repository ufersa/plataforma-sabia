import React from 'react';
import styled, { css } from 'styled-components';

const ContactUsSuccessModal = () => {
	return (
		<Container>
			<img
				src="charity-rafiki.svg"
				alt="Ilustração de uma garota dentro de um smartphone recebendo uma doação de um garoto"
			/>

			<div>
				<h3>Recebemos sua mensagem!</h3>
				<p>Obrigado pelo seu contato, assim que possível, retornaremos.</p>
			</div>
		</Container>
	);
};

const Container = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		font-weight: 500;

		> img {
			margin-right: 3.2rem;
		}

		> div {
			max-width: 38rem;
		}

		> div > h3 {
			color: ${colors.secondary};
			font-size: 2.8rem;
			line-height: 3.3rem;
		}

		> div > p {
			margin-top: 0.8rem;
			line-height: 2.4rem;
		}
	`}
`;

export default ContactUsSuccessModal;
