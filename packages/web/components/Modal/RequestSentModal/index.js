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

const Modal = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		max-width: 77rem;

		> div:first-child {
			max-width: 26rem;

			> img {
				width: 100%;
				height: 100%;
			}
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;

			> div:first-child {
				display: none;
			}

			${InfosContainer} {
				margin-left: 0;
				margin-right: 0;
			}
		}
	`}
`;

export default RequestSentModal;
