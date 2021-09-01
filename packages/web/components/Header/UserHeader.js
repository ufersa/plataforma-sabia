import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { MdAccountCircle } from 'react-icons/md';
import styled, { css, useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth, useVisibleComponent } from '../../hooks';
import { UserProfileDropDown } from '../UserProfile';
import { internal as internalPages } from '../../utils/enums/pages.enum';

const UserHeader = () => {
	const { colors } = useTheme();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);
	const [ref, isDropDownVisible, setIsDropDownVisible] = useVisibleComponent();
	const userFirstName = user.full_name && user.full_name.split(' ')[0];
	const router = useRouter();

	const toggleVisible = () => setIsDropDownVisible((prev) => !prev);

	const handleToggleDropDown = (e) => {
		e.preventDefault();
		if (!user?.email) {
			router.push(internalPages.signIn);
		} else {
			toggleVisible();
		}
	};

	return (
		<LoginBox ref={ref}>
			<UserButton type="button" onClick={handleToggleDropDown}>
				<MdAccountCircle color={colors.secondary} />
				<span>{userFirstName || t('common:login')}</span>
			</UserButton>
			<UserProfileDropDown visible={isDropDownVisible} toggleVisible={toggleVisible} />
		</LoginBox>
	);
};

const LoginBox = styled.div`
	${({ theme: { screens } }) => css`
		height: 100%;

		@media screen and (max-width: ${screens.medium}px) {
			display: none;
		}
	`}
`;

const UserButton = styled.button`
	${({ theme: { colors, sizes, screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${colors.secondary};
		background: none;
		border: 0;
		font-size: 1.4rem;
		font-weight: 700;
		text-transform: uppercase;
		height: 100%;
		min-width: 8rem;
		padding: 0 2rem;
		transition: color 0.3s;
		cursor: pointer;

		span {
			margin-left: 13px;
		}

		svg {
			height: ${sizes.bigIcon}rem;
			width: ${sizes.bigIcon}rem;
		}

		:hover {
			color: ${colors.darkGreen};
		}

		@media (max-width: ${screens.medium}px) {
			a {
				font-size: 1rem;
			}

			svg {
				height: ${sizes.defaultIcon}rem;
				width: ${sizes.defaultIcon}rem;
			}
		}
	`}
`;

export default UserHeader;
