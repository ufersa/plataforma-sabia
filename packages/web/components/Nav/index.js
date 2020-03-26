import React from 'react';
import Link from 'next/link';

import { MdAccountCircle } from 'react-icons/md';
import { Header, Container, LeftContent, RightContent, Button } from './styles';

const links = [
	{
		id: 1,
		label: 'Início',
		href: '/home',
	},
	{
		id: 2,
		label: 'Categorias',
		href: '/categorias',
	},
	{
		id: 3,
		label: 'Desenvolvedores',
		href: '/desenvolvedores',
	},
	{
		id: 4,
		label: 'Plataforma',
		href: '/plataforma',
	},
	{
		id: 5,
		label: 'Preços',
		href: '/precos',
	},
	{
		id: 6,
		label: 'Contato',
		href: '/contact',
	},
];

const Navigation = () => (
	<Header>
		<Container>
			<LeftContent>
				<Link href="/" passHref>
					<a>
						<img src="/logo.svg" alt="Logo da Plataforma Sabiá" />
					</a>
				</Link>
				<nav>
					<ul>
						{links.map(({ id, label, href }) => (
							<li key={id}>
								<Link href={href} passHref>
									<a>{label}</a>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</LeftContent>
			<RightContent>
				<div>
					<MdAccountCircle color="#FFA607" size={50} />
					<Link href="/login" passHref>
						<a>Entrar</a>
					</Link>
				</div>
			</RightContent>
		</Container>
		<Button>Cadastre sua tecnologia</Button>
	</Header>
);

export default Navigation;
