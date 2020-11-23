import styled, { css } from 'styled-components';
import * as ReactTabs from 'react-tabs';

export const Tabs = styled(ReactTabs.Tabs)`
	-webkit-tap-highlight-color: transparent;
`;

export const Tab = styled(ReactTabs.Tab)`
	${({ selected, disabled, theme: { colors } }) => css`
		display: inline-block;
		bottom: -1px;
		position: relative;
		list-style: none;
		font-size: 1.4rem;
		line-height: 17px;
		text-align: center;
		padding: 1.6rem 0.8rem;
		text-transform: uppercase;
		border: 0.5px solid transparent;
		border-radius: 0;
		color: ${selected ? colors.lightGray : colors.lightGray2};

		cursor: ${disabled ? 'default' : 'pointer'};

		background: ${selected ? colors.white : colors.lightGray4};

		border-left-color: ${colors.lightGray3};
		border-right-color: ${colors.lightGray3};

		&:first-child {
			border-left-color: transparent;
		}

		&:last-child {
			border-right-color: transparent;
		}

		&:focus {
			box-shadow: 0 0 5px ${colors.darkWhite};
			border-color: ${colors.darkWhite};
			outline: none;

			&:after {
				content: '';
				position: absolute;
				height: 5px;
				left: -4px;
				right: -4px;
				bottom: -5px;
				background: ${colors.white};
			}
		}
	`}
`;

export const TabPanel = styled(ReactTabs.TabPanel)`
	display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

export const TabList = styled(ReactTabs.TabList)`
	padding: 0;
`;
