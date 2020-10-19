import React from 'react';
import styled, { css } from 'styled-components';

const RequestSentModal = () => {
	return (
		<Modal>
			<div>
				<img
					src="/time-management-rafiki.svg"
					alt="Ilustração de um rapaz segurando um relógio e apoiado em uma ampulheta"
				/>
			</div>

			<InfosContainer>
				<p>Sua solicitação foi enviada</p>
				<span>
					Seu cadastro será analisado pela nossa equipe, em até 72h enviaremos uma
					resposta
				</span>
			</InfosContainer>
		</Modal>
	);
};

const Modal = styled.div`
	display: flex;
	max-width: 77rem;

	> div:first-child > img {
		width: 100%;
		height: 100%;
	}
`;

const InfosContainer = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		margin-left: 6.8rem;
		margin-right: 6rem;

		> p {
			color: ${colors.secondary};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 0.8rem;
			line-height: 3.3rem;
		}

		> span {
			font-size: 1.6rem;
			line-height: 2.4rem;
		}
	`}
`;

export default RequestSentModal;
