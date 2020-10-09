import React from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const BeAReviewerModal = () => {
	const router = useRouter();

	return (
		<Modal>
			<div>
				<img
					src="/windows-rafiki.svg"
					alt="Rapaz sentado em um balanço e ao lado um balanço vazio representando solidão"
				/>
			</div>

			<InfosContainer>
				<p>Que bom poder contar contigo</p>
				<span>
					O <b>curador</b> tem a responsabilidade de analisar previamente os novos
					cadastros de tecnologias que tenham afinidade com sua área de pesquisa e
					conhecimento, e assim, sugerir alterações, emitir parecer favorável ou não à
					publicação dessas tecnologias na <b>Plataforma Sabiá</b>. Para que o cadastro do
					curador seja aprovado é necessário conhecermos qual a sua <b>área de atuação</b>{' '}
					escolhendo-as nas opções abaixo.
				</span>

				<Button onClick={() => router.push('/user/my-account')}>Enviar solicitação</Button>
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
		max-width: 41rem;

		margin-left: 6.8rem;

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

			> b:nth-of-type(2) {
				color: ${colors.secondary};
			}
		}
	`}
`;

const Button = styled.button`
	${({ theme: { colors } }) => css`
		background: ${colors.secondary};
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
			background: ${colors.darkGreen};
		}
	`}
`;

export default BeAReviewerModal;
