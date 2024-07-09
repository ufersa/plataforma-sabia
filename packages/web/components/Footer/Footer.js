import Proptypes from 'prop-types';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from '../Link';
import {
	internal as internalPages,
	socialMedia as socialMediaPages,
	landingPage,
} from '../../utils/enums/pages.enum';
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
	LogosContainer,
} from './styles';

const Footer = ({ isAbout }) => (
	<StyledFooter>
		<FooterHeader>
			<FooterHeaderContainer>
				<FooterText>Siga o sabiá por onde ele for!</FooterText>
				<FooterIconsList>
					<FooterIconsListItem>
						<a
							href={socialMediaPages.facebook}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebookF />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href={socialMediaPages.twitter}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href={socialMediaPages.instagram}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href={socialMediaPages.linkedIn}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin />
						</a>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<a
							href={socialMediaPages.youtube}
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
					<Link href={internalPages.home}>
						<img src="/logo-footer.svg" alt="Logo da Plataforma Sabiá" />
					</Link>
				</div>
				<div>
					<SiteInfoListTitle>Plataforma</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.intro
										: `${landingPage.url}${landingPage.intro}`
								}
							>
								O que é?
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.about
										: `${landingPage.url}${landingPage.about}`
								}
							>
								Quem somos
							</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Funcionalidades</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.features
										: `${landingPage.url}${landingPage.features}`
								}
							>
								Para Inventores
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.features
										: `${landingPage.url}${landingPage.features}`
								}
							>
								Para a Sociedade
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.features
										: `${landingPage.url}${landingPage.features}`
								}
							>
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
								href={socialMediaPages.podcast}
								target="_blank"
								rel="noopener noreferrer"
							>
								Podcasts
							</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href={socialMediaPages.courses}>Cursos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link
								href={socialMediaPages.blog}
								target="_blank"
								rel="noopener noreferrer"
							>
								Blog
							</Link>
						</SiteInfoListItem>
						{/* <SiteInfoListItem>
							<Link href={internalPages.ideas}>Banco de Ideias</Link>
						</SiteInfoListItem> */}
						<SiteInfoListItem>
							<Link href={internalPages.announcements}>Banco de Editais</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href={internalPages.showcase}>Vitrines tecnológicas</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Contato</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link
								href={
									isAbout
										? landingPage.contact
										: `${landingPage.url}${landingPage.contact}`
								}
							>
								Fale conosco
							</Link>
						</SiteInfoListItem>
					</ul>
				</div>
			</SiteInfoContainer>
		</SiteInfo>
		<SiteSocket>
			<SiteSocketContainer>
				<LogosContainer>
					<img
						src="/logo-ufersa-color.png"
						alt="Logo da Universidade Federal Rural do Semi-Árido"
					/>
					<img
						src="/logo-mdir-color.jpg"
						alt="Logo do Ministério do Desenvolvimento Regional"
					/>
				</LogosContainer>

				<SiteSocketList>
					<SiteSocketListItem>
						<Link href={internalPages.privacyPolicy}>Política de Privacidade</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href={internalPages.termsOfUse}>Termos e Condições</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href={`${landingPage.url}${landingPage.contact}`}>Contato</Link>
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
