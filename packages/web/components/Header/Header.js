import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../Link';
import { HamburguerMenu } from '../HamburguerMenu';

import {
	StyledHeader,
	Container,
	LeftContent,
	LogoContainer,
	MenuLinksWrapper,
	MenuLinksList,
	MenuLinksItem,
	RightContent,
} from './styles';
import UserHeader from './UserHeader';
import links from './links';
import LanguageSwitcher from './LanguageSwitcher';
import NewTechnologyButton from './NewTechnologyButton';

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
					<NewTechnologyButton />
					<HamburguerMenu links={links} />
				</RightContent>
			</Container>
		</StyledHeader>
	);
};

export default Header;
