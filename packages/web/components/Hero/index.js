import React from 'react';
import Button from '../Button';
import { useTheme } from '../../hooks';
import { HeroImage, Content, SearchBox } from './styles';

const Hero = () => {
	const submit = () => {
		// Submit code
	};

	const { colors } = useTheme();

	return (
		<HeroImage>
			<Content>
				<h1>O que você precisa para mudar o Semiárido?</h1>
				<p>Encontre a tecnologia certa para a sua região</p>
				<SearchBox>
					<form action="">
						<input type="text" placeholder="Qual solução você busca?" />
						<Button
							onClick={submit}
							type="submit"
							color={colors.white}
							bgColor={colors.primary}>
							Buscar
						</Button>
					</form>
				</SearchBox>
			</Content>
		</HeroImage>
	);
};

export default Hero;
