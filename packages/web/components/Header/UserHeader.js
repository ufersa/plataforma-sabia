import React, { useState, useEffect, useRef } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import styled, { css, useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useModal, useAuth } from '../../hooks';
import { UserProfileDropDown } from '../UserProfile';

const UserHeader = () => {
	const [dropDownVisible, setDropDownVisible] = useState(false);
	const { colors } = useTheme();
	const { openModal } = useModal();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);
	const ref = useRef(null);

	const toggleVisible = () => setDropDownVisible((prev) => !prev);

	const handleDropdownVisible = (e) => {
		e.preventDefault();
		if (!user.email) {
			openModal('login');
		} else {
			toggleVisible();
		}
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setDropDownVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<LoginBox ref={ref}>
			<UserButton
				type="button"
				onClick={handleDropdownVisible}
				onMouseEnter={() => user.email && setDropDownVisible(true)}
			>
				<MdAccountCircle color={colors.secondary} />
				<span>{user?.first_name || t('common:login')}</span>
			</UserButton>
			<UserProfileDropDown visible={dropDownVisible} toggleVisible={toggleVisible} />
		</LoginBox>
	);
};

const LoginBox = styled.div`
	${({ theme: { colors, screens } }) => css`
		border-left: 0.1rem solid ${colors.border};
		border-right: 0.1rem solid ${colors.border};
		height: 100%;

		@media (max-width: ${screens.medium}px) {
			border-left: none;
		}
	`}
`;

const UserButton = styled.button`
	${({ theme: { colors, sizes, screens } }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: ${colors.mediumGray};
		background: none;
		border: 0;
		font-size: 1.2rem;
		height: 100%;
		min-width: 8rem;
		padding: 0 2rem;
		transition: color 0.3s;
		cursor: pointer;

		svg {
			height: ${sizes.bigIcon}rem;
			width: ${sizes.bigIcon}rem;
		}

		:hover {
			color: ${colors.secondary};
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
