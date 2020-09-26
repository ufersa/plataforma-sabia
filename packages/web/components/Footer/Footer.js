import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
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
	SiteSocket,
	SiteSocketContainer,
	SiteSocketList,
	SiteSocketListItem,
} from './styles';

const Footer = () => (
	<StyledFooter>
		<FooterHeader>
			<FooterHeaderContainer>
				<Link href="/">
					<img src="/logo-footer.svg" alt="Logo da Plataforma Sabiá" />
				</Link>
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
					<SiteInfoListTitle>Informação</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="/">Nossos contatos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Política de privacidade</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Termos e condições</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">FAQs</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Localizações</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="/">Mossoró</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Brasília</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">João Pessoa</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Recife</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Nova Cruz</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Localizações</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="/">Mossoró</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Brasília</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">João Pessoa</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Recife</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Nova Cruz</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Links Úteis</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							<Link href="/">Blog</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Nossos contatos</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Lista de submissão</Link>
						</SiteInfoListItem>
						<SiteInfoListItem>
							<Link href="/">Suporte</Link>
						</SiteInfoListItem>
					</ul>
				</div>
				<div>
					<SiteInfoListTitle>Sobre a Plataforma</SiteInfoListTitle>
					<ul>
						<SiteInfoListItem>
							Projeto Open Source mantido pela UFERSA.
						</SiteInfoListItem>
						<SiteInfoListItem>
							Avenida Francisco Mota, S/N, Mossoró-RN.
						</SiteInfoListItem>
					</ul>
				</div>
			</SiteInfoContainer>
		</SiteInfo>
		<SiteSocket>
			<SiteSocketContainer>
				<div>
					<span>Orgulhosamente</span> desenvolvido pela equipe da
					<span> Plataforma Sabiá</span>.
				</div>
				<SiteSocketList>
					<SiteSocketListItem>
						<Link href="/privacy-policy">Política de Privacidade</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href="/terms-of-use">Termos e Condições</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href="/">Contacte-nos</Link>
					</SiteSocketListItem>
				</SiteSocketList>
			</SiteSocketContainer>
		</SiteSocket>
	</StyledFooter>
);

export default Footer;
