import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import Link from '../Link';
import {
	StyledFooter,
	FooterHeader,
	FooterHeaderContainer,
	FooterIconsList,
	FooterIconsListItem,
	SiteInfo,
	SiteInfoContainer,
	Widget,
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
							<FaFacebookF size={25} />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaTwitter size={25} />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaInstagram size={25} />
						</Link>
					</FooterIconsListItem>
					<FooterIconsListItem>
						<Link href="/">
							<FaPinterestP size={25} />
						</Link>
					</FooterIconsListItem>
				</FooterIconsList>
			</FooterHeaderContainer>
		</FooterHeader>
		<SiteInfo>
			<SiteInfoContainer>
				<Widget>
					<h4>Informação</h4>
					<ul>
						<li>
							<Link href="/">Nossos contatos</Link>
						</li>
						<li>
							<Link href="/">Política de privacidade</Link>
						</li>
						<li>
							<Link href="/">Termos e condições</Link>
						</li>
						<li>
							<Link href="/">FAQs</Link>
						</li>
					</ul>
				</Widget>
				<Widget>
					<h4>Localizações</h4>
					<ul>
						<li>
							<Link href="/">Mossoró</Link>
						</li>
						<li>
							<Link href="/">Brasília</Link>
						</li>
						<li>
							<Link href="/">João Pessoa</Link>
						</li>
						<li>
							<Link href="/">Recife</Link>
						</li>
						<li>
							<Link href="/">Nova Cruz</Link>
						</li>
					</ul>
				</Widget>
				<Widget>
					<h4>Localizações</h4>
					<ul>
						<li>
							<Link href="/">Mossoró</Link>
						</li>
						<li>
							<Link href="/">Brasília</Link>
						</li>
						<li>
							<Link href="/">João Pessoa</Link>
						</li>
						<li>
							<Link href="/">Recife</Link>
						</li>
						<li>
							<Link href="/">Nova Cruz</Link>
						</li>
					</ul>
				</Widget>
				<Widget>
					<h4>Links Úteis</h4>
					<ul>
						<li>
							<Link href="/">Blog</Link>
						</li>
						<li>
							<Link href="/">Nossos contatos</Link>
						</li>
						<li>
							<Link href="/">Lista de submissão</Link>
						</li>
						<li>
							<Link href="/">Suporte</Link>
						</li>
					</ul>
				</Widget>
				<Widget>
					<h4>Sobre a Plataforma Sabiá</h4>
					<ul>
						<li>Projeto Open Source mantido pela UFERSA.</li>
						<li>Avenida Francisco Mota, S/N, Mossoró-RN.</li>
					</ul>
				</Widget>
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
						<Link href="/">Política de Privacidade</Link>
					</SiteSocketListItem>
					<SiteSocketListItem>
						<Link href="/">Termos e Condições</Link>
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
