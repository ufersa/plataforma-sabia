import React from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const PendingUserDataModal = () => {
	const router = useRouter();

	return (
		<Modal>
			<div>
				<img
					src="/alone-rafiki.svg"
					alt="Rapaz sentado em um balanço e ao lado um balanço vazio representando solidão"
				/>
			</div>

			<InfosContainer>
				<p>Você possui dados pendentes</p>
				<span>Complete o seu cadastro para solicitar ser um curador.</span>

				<Button onClick={() => router.push('/user/my-account')}>Ir para meu perfil</Button>
			</InfosContainer>
		</Modal>
	);
};

const Modal = styled.div`
	display: flex;

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

		> p {
			color: ${colors.red};
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

const Button = styled.button`
	${({ theme: { colors } }) => css`
		background: ${colors.primary};
		border: none;
		outline: none;

		align-self: flex-start;
		margin-top: auto;
		padding: 0.4rem 0.8rem;

		color: ${colors.white};
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		:hover,
		:focus {
			background: ${colors.darkOrange};
		}
	`}
`;

export default PendingUserDataModal;
