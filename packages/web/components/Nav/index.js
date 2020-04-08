import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import NextLink from 'next/link';
import Link from '../Link';

import {
	Header,
	Container,
	LeftContent,
	LogoContainer,
	MenuLinksWrapper,
	MenuLinksList,
	MenuLinksItem,
	RightContent,
	Button,
} from './styles';
import { useTheme } from '../../hooks';

import links from './links';

const Navigation = () => {
	const { colors, sizes } = useTheme();
	return (
		<Header>
			<Container>
				<LeftContent>
					<LogoContainer>
						<Link href="/">
							<img src="/logo.svg" alt="Logo da Plataforma Sabiá" />
						</Link>
					</LogoContainer>
					<MenuLinksWrapper>
						<MenuLinksList>
							{links.map(({ id, label, href }) => (
								<MenuLinksItem key={id}>
									<Link href={href}>{label}</Link>
								</MenuLinksItem>
							))}
						</MenuLinksList>
					</MenuLinksWrapper>
				</LeftContent>
				<RightContent>
					<MdAccountCircle color={colors.orange} size={sizes.bigIcon} />
					<Link href="/login">Entrar</Link>
				</RightContent>
			</Container>
			<NextLink href="/login" passHref>
				<Button>Cadastre sua tecnologia</Button>
			</NextLink>
		</Header>
	);
};

export default Navigation;
