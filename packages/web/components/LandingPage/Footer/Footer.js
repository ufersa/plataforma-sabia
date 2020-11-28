import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
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
} from './styles';

const Footer = () => (
	<StyledFooter>
		<FooterHeader>
			<FooterHeaderContainer>
				<FooterIconsList>
					<FooterIconsListItem>
						<Link href="/">
							<FaFacebookF />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaTwitter />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaInstagram />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaPinterestP />
						</Link>
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
