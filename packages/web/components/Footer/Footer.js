import React from 'react';
import Proptypes from 'prop-types';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from '../Link';
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
	SiteSocket,
	SiteSocketContainer,
	SiteSocketList,
	SiteSocketListItem,
} from './styles';

const Footer = ({ isAbout }) => (
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
					<FooterIconsListItem>
						<a
							href="https://www.youtube.com/channel/UCZVZ7yxCvjJIihaDz6WytpA"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaYoutube />
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
							<Link href={isAbout ? '#intro' : '/about#intro'}>O que é?</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href={isAbout ? '#about' : '/about#about'}>Quem somos</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Funcionalidades</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href={isAbout ? '#features' : '/about#features'}>
								Para Inventores
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href={isAbout ? '#features' : '/about#features'}>
								Para a Sociedade
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href={isAbout ? '#features' : '/about#features'}>
								Para Financiadores
							</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Recursos</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link
								href="https://anchor.fm/papodesabia/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Podcasts
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/courses">Cursos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link
								href="https://blog.plataformasabia.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Blog
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/ideas">Banco de Ideias</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/announcements">Banco de Editais</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/vitrines">Vitrines tecnológicas</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Contato</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href={isAbout ? '#contact' : '/contact-us'}>Fale conosco</Link>
						</SiteInfoListItem>
					</ul>
				</div>
			</SiteInfoContainer>
		</SiteInfo>
		<SiteSocket>
			<SiteSocketContainer>
				<div>
					<span>Orgulhosamente</span> desenvolvido pela equipe da
					<span> Plataforma Sabiá</span> na{' '}
					<span>UNIVERSIDADE FEDERAL RURAL DO SEMI-ÁRIDO - UFERSA</span>.
				</div>
				<SiteSocketList>
					<SiteSocketListItem>
						<Link href="/privacy-policy">Política de Privacidade</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href="/terms-of-use">Termos e Condições</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href="/about#contact">Contato</Link>
					</SiteSocketListItem>
				</SiteSocketList>
			</SiteSocketContainer>
		</SiteSocket>
	</StyledFooter>
);

Footer.propTypes = {
	isAbout: Proptypes.bool,
};

Footer.defaultProps = {
	isAbout: false,
};

export default Footer;
