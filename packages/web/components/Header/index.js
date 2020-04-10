import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import NextLink from 'next/link';
import Link from '../Link';
import HamburguerMenu from '../HamburguerMenu';

import {
	StyledHeader,
	Container,
	LeftContent,
	LogoContainer,
	MenuLinksWrapper,
	MenuLinksList,
	MenuLinksItem,
	RightContent,
	LoginBox,
	Button,
} from './styles';
import { useTheme } from '../../hooks';

import links from './links';

const Header = () => {
	const { colors } = useTheme();
	return (
		<StyledHeader>
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
					<LoginBox>
						<MdAccountCircle color={colors.orange} />
						<Link href="/login">Entrar</Link>
					</LoginBox>
					<NextLink href="/login" passHref>
						<Button>
							<span>Cadastre sua</span>tecnologia
						</Button>
					</NextLink>
					<HamburguerMenu links={links} />
				</RightContent>
			</Container>
		</StyledHeader>
	);
};

export default Header;
