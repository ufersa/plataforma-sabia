import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledLink = styled.a`
	${({ theme: { colors }, hover, alignSelf, variant, color }) => css`
		color: ${colors[color] || colors.darkGray};
		align-self: ${alignSelf};
		font-weight: ${variant === 'bold' ? '700' : '500'};

		:hover {
			text-decoration: ${hover ? 'underline' : 'none'};
		}

		:focus {
			box-shadow: 0px 0px 4px 2px ${colors.primary};
		}
	`}
`;
