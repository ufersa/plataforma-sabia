import React from 'react';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
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
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
	const { t } = useTranslation(['common']);
	return (
		<StyledHeader>
			<Container>
				<LeftContent>
					<LogoContainer>
						<Link href="/">
							<img src="/logo.svg" alt={t('common:logoDesc')} />
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
					<LanguageSwitcher />
					<UserHeader />
					<NextLink href="/login" passHref>
						<Button>
							<span
								dangerouslySetInnerHTML={{
									__html: t('common:registerTechonology'),
								}}
							/>
						</Button>
					</NextLink>
					<HamburguerMenu links={links} />
				</RightContent>
			</Container>
		</StyledHeader>
	);
};

export default Header;
