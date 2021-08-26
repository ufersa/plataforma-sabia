import styled, { css } from 'styled-components';

import { Link } from '../Link';

const AnnouncementBanner = () => {
	return (
		<Wrapper>
			<Link
				href="https://blog.plataformasabia.com/prorrogadas-as-inscricoes-para-o-edital-de-projetos-de-inovacao-e-empreendedorismo-tecnologico"
				target="_blank"
			>
				<Banner
					src="/banner-desktop.png"
					alt="Edital de apoio ao desenvolvimento e aplicação de tecnologias para o semiárido"
				/>
				<Banner
					src="/banner-mobile.png"
					alt="Edital de apoio ao desenvolvimento e aplicação de tecnologias para o semiárido"
				/>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		margin-bottom: 4.2rem;
		position: relative;

		img:last-child {
			display: block;
		}

		@media screen and (min-width: ${screens.medium}px) {
			img:first-child {
				display: block;
			}

			img:last-child {
				display: none;
			}
		}
	`}
`;

const Banner = styled.img`
	${({ theme: { colors } }) => css`
		display: none;
		width: 100%;
		background-color: ${colors.lightGray4};
		padding: 0 5%;
	`}
`;

export default AnnouncementBanner;
