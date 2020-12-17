import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from '../../Link';
import {
	StyledFooter,
	FooterHeader,
	FooterHeaderContainer,
	FooterIconsList,
	FooterIconsListItem,
	SiteInfo,
	SiteInfoContainer,
	SiteInfoListTitle,
	SiteInfoListItem,
	FooterText,
} from './styles';

const Footer = () => (
	<StyledFooter>
		<FooterHeader>
			<FooterHeaderContainer>
				<FooterText>Siga o sabiá por onde ele for!</FooterText>
				<FooterIconsList>
					<FooterIconsListItem>
						<a
							href="https://www.facebook.com/plataformasabiaufersa"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebookF />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href="https://twitter.com/plataformasabia"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href="https://www.instagram.com/plataformasabia"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href="https://www.linkedin.com/in/plataformasabia"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin />
						</a>
					</FooterIconsListItem>
				</FooterIconsList>
			</FooterHeaderContainer>
		</FooterHeader>
		<SiteInfo>
			<SiteInfoContainer>
				<div>
					<Link href="/">
						<img src="/logo-footer.svg" alt="Logo da Plataforma Sabiá" />
					</Link>
				</div>
				<div>
					<SiteInfoListTitle>Plataforma</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="#what-is">O que é?</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="#about">Quem somos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="#partners">Parcerias</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Funcionalidades</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="#investors">Para Inventores</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="#society">Para a Sociedade</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="#financiers">Para Financiadores</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Recursos</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="/">Cursos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Fórum</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Ajuda</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Contato</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="#contact">Fale conosco</Link>
						</SiteInfoListItem>
					</ul>
				</div>
			</SiteInfoContainer>
		</SiteInfo>
	</StyledFooter>
);

export default Footer;
