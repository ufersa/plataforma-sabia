import React from 'react';
import Link from 'next/link';
import styled, { css, useTheme } from 'styled-components';

import { RectangularButton } from '../../components/Button';
import { Title } from '../../components/Common';

const NewSolution = () => {
	const { colors } = useTheme();

	return (
		<Wrapper>
			<Container>
				<Title color={colors.black}>Que tipo de solução você irá cadastrar?</Title>

				<RegisterType>
					<Link href="/technology/new" passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/agro-machine.png"
							colorVariant="orange"
						>
							Tecnologias
						</RectangularButton>
					</Link>
					<Link href="/service/new" passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/hand-holding-earth.png"
							colorVariant="green"
						>
							Serviços
						</RectangularButton>
					</Link>
				</RegisterType>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
		padding: 4.8rem 5%;
	`}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const RegisterType = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(27rem, 100%));
	grid-gap: 1.6rem;
	justify-content: center;
	width: 100%;
	margin-top: 1.6rem;

	a {
		height: 27rem;
		font-size: 2.4rem;
		line-height: 3rem;
		font-weight: 500;
		text-transform: none;
	}
`;

export default NewSolution;
