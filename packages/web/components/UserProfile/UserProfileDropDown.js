import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LogoutButton from './LogoutButton';
import PageLink from './PageLink';
import sections from './sections';

const UserDropDown = ({ visible, toggleVisible }) => {
	const { t } = useTranslation(['profile']);

	return (
		visible && (
			<DropDownContainer>
				<DropDownMenu>
					{sections.map(({ pages }) =>
						pages.map((page) => (
							<PageLink key={page.slug} href={page.href} onClick={toggleVisible}>
								<page.icon />
								{t(page.slug)}
							</PageLink>
						)),
					)}
					<Divider>
						<LogoutButton cb={toggleVisible} />
					</Divider>
				</DropDownMenu>
			</DropDownContainer>
		)
	);
};

UserDropDown.propTypes = {
	visible: PropTypes.bool.isRequired,
	toggleVisible: PropTypes.func.isRequired,
};

const DropDownContainer = styled.div`
	position: relative;
`;

const DropDownMenu = styled.div`
	${({ theme: { colors } }) => css`
		position: absolute;
		width: 24rem;
		left: calc(50% - 13rem);
		top: calc(100% + 3rem);
		background: ${colors.white};
		border-radius: 0.4rem;
		padding: 2rem;
		box-shadow: 0 2px 4px 0 ${colors.secondary};
		transition: 0.3s;

		:hover {
			box-shadow: 0 4px 8px 0 ${colors.secondary};
		}

		&::before {
			content: '';
			position: absolute;
			left: calc(50% - 2rem);
			top: -2rem;
			width: 0;
			height: 0;
			border-left: 2rem solid transparent;
			border-right: 2rem solid transparent;
			border-bottom: 2rem solid ${colors.white};
		}
	`}
`;

const Divider = styled.div`
	${({ theme: { colors } }) => css`
		padding-top: 1rem;
		border-top: 0.1rem solid ${colors.border};
	`}
`;

export default UserDropDown;
