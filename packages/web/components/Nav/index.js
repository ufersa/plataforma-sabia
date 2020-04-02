import React from 'react';
import Link from 'next/link';

import { MdAccountCircle } from 'react-icons/md';
import { Header, Container, LeftContent, RightContent, Button } from './styles';
import { useTheme } from '../../hooks';

import links from './links';

const Navigation = () => {
	const { colors, sizes } = useTheme();
	return (
		<Header>
			<Container>
				<LeftContent>
					<div>
						<Link href="/" passHref>
							<a>
								<img src="/logo.svg" alt="Logo da Plataforma Sabiá" />
							</a>
						</Link>
					</div>
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
					<MdAccountCircle color={colors.orange} size={sizes.bigIcon} />
					<Link href="/login" passHref>
						<a>Entrar</a>
					</Link>
				</RightContent>
			</Container>
			<Link href="/login" passHref>
				<Button>Cadastre sua tecnologia</Button>
			</Link>
		</Header>
	);
};

export default Navigation;
