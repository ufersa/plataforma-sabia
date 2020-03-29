import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import {
	Footer,
	FooterHeader,
	FooterHeaderContainer,
	SiteInfo,
	SiteInfoContainer,
	Widget,
	SiteSocket,
	SiteSocketContainer,
} from './styles';

const Component = () => (
	<Footer>
		<FooterHeader>
			<FooterHeaderContainer>
				<Link href="/" passHref>
					<a>
						<img src="/logo-footer.svg" alt="Logo da Plataforma Sabiá" />
					</a>
				</Link>
				<ul>
					<li>
						<Link href="/" passHref>
							<a>
								<FaFacebookF size={25} />
							</a>
						</Link>
					</li>
					<li>
						<Link href="/" passHref>
							<a>
								<FaTwitter size={25} />
							</a>
						</Link>
					</li>
					<li>
						<Link href="/" passHref>
							<a>
								<FaInstagram size={25} />
							</a>
						</Link>
					</li>
					<li>
						<Link href="/" passHref>
							<a>
								<FaPinterestP size={25} />
							</a>
						</Link>
					</li>
				</ul>
			</FooterHeaderContainer>
		</FooterHeader>
		<SiteInfo>
			<SiteInfoContainer>
				<Widget>
					<h3>Informação</h3>
					<div>
						<ul>
							<li>
								<Link href="/" passHref>
									<a>Nossos contatos</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Política de privacidade</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Termos e condições</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>FAQs</a>
								</Link>
							</li>
						</ul>
					</div>
				</Widget>
				<Widget>
					<h3>Localizações</h3>
					<div>
						<ul>
							<li>
								<Link href="/" passHref>
									<a>Mossoró</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Brasília</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>João Pessoa</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Recife</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Nova Cruz</a>
								</Link>
							</li>
						</ul>
					</div>
				</Widget>
				<Widget>
					<h3>Localizações</h3>
					<div>
						<ul>
							<li>
								<Link href="/" passHref>
									<a>Mossoró</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Brasília</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>João Pessoa</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Recife</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Nova Cruz</a>
								</Link>
							</li>
						</ul>
					</div>
				</Widget>
				<Widget>
					<h3>Links Úteis</h3>
					<div>
						<ul>
							<li>
								<Link href="/" passHref>
									<a>Blog</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Nossos contatos</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Lista de submissão</a>
								</Link>
							</li>
							<li>
								<Link href="/" passHref>
									<a>Suporte</a>
								</Link>
							</li>
						</ul>
					</div>
				</Widget>
				<Widget>
					<h3>Sobre a Plataforma Sabiá</h3>
					<div>
						<ul>
							<li>Projeto Open Source mantido pela UFERSA.</li>
							<li>Avenida Francisco Mota, S/N, Mossoró-RN.</li>
						</ul>
					</div>
				</Widget>
			</SiteInfoContainer>
		</SiteInfo>
		<SiteSocket>
			<SiteSocketContainer>
				<div>
					<span>Orgulhosamente</span> desenvolvido pela equipe da
					<span> Plataforma Sabiá</span>.
				</div>
				<ul>
					<li>
						<Link href="/" passHref>
							<a>Política de Privacidade</a>
						</Link>
					</li>
					<li>
						<Link href="/" passHref>
							<a>Termos e Condições</a>
						</Link>
					</li>
					<li>
						<Link href="/" passHref>
							<a>Contacte-nos</a>
						</Link>
					</li>
				</ul>
			</SiteSocketContainer>
		</SiteSocket>
	</Footer>
);

export default Component;
