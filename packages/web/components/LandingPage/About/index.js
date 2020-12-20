import React from 'react';

import {
	Wrapper,
	Container,
	TextContainer,
	Title,
	TextContent,
	TopImage,
	LogosContainer,
} from './styles';

const About = () => {
	return (
		<Wrapper id="about">
			<Container>
				<TextContainer>
					<Title>Quem somos</Title>
					<TextContent>
						A Plataforma Sabiá é uma iniciativa da Universidade Federal Rural do
						Semi-Árido – Ufersa. Fundada em 1967, a então Escola Superior de Agricultura
						de Mossoró – ESAM, foi durante 38 anos a base da atual Ufersa, transformada
						em Universidade Federal em agosto de 2005. A instituição foi um divisor de
						águas para o interior potiguar e para o semiárido brasileiro. Referência nas
						ciências agrárias, a ESAM/Ufersa começou oferecendo o curso de Agronomia.
						Atualmente, a Universidade conta com 4 campi, 46 cursos de graduação e 18
						programas de pós-graduação.
					</TextContent>
					<TextContent>
						Apontada pelo MEC como uma das melhores instituições públicas de ensino
						superior do semiárido brasileiro, a Ufersa vem se destacando em rankings
						nacionais e internacionais como o da Times Higher Education THE. A cada ano,
						a instituição se consolida com uma universidade referenciada nas áreas de
						ensino, iniciação científica, pesquisa, extensão, inovação e
						sustentabilidade. É neste celeiro de produção que está alicerçada a base da
						Plataforma Sabiá - a grande vitrine tecnológica do semiárido brasileiro. É a
						partir da Ufersa, na cidade de Mossoró (RN), que a Sabiá surge para abraçar
						a inovação, a tecnologia e o conhecimento e, assim, integrar todos os
						agentes da cadeia produtiva do rico bioma da Caatinga.
					</TextContent>
					<TextContent>
						Além da Ufersa, a Plataforma Sabiá recebe a assinatura e a credibilidade do
						Ministério do Desenvolvimento Regional (MDR), por meio do projeto Rotas da
						Integração Nacional. Nessa iniciativa, as Rotas se transformam em redes de
						Arranjos Produtivos Locais (APLs) voltadas para a promoção da inovação,
						diferenciação, competitividade e lucratividade dos empreendimentos
						associados, com foco no desenvolvimento regional.
					</TextContent>
					<TextContent>
						Atualmente, o MDR conta com as rotas do Cordeiro, do Mel, do Peixe, das
						Frutas, da Mandioca e da Economia Criativa. A Plataforma Sabiá se soma ao
						potencial dessas rotas abrindo novos caminhos para o desenvolvimento
						nordestino.
					</TextContent>
				</TextContainer>
				<LogosContainer>
					<img
						src="/logo-ufersa.png"
						alt="Logo da Universidade Federal Rural do Semi-Árido"
					/>
					<img
						src="/logo-rotas-integracao-nacional.png"
						alt="Logo das Rotas de Integração Nacional"
					/>
					<img src="/logo-gov.svg" alt="Logo do Ministério do Desenvolvimento Regional" />
				</LogosContainer>
			</Container>
			<TopImage src="/lp-top-about.svg" alt="Forma laranjada" />
		</Wrapper>
	);
};

export default About;
