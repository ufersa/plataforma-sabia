import React from 'react';

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
	Button,
} from './styles';
import UserHeader from './UserHeader';
import links from './links';

const Header = () => {
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
					<UserHeader />
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
