import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.darkGray};

	:hover {
		text-decoration: ${({ hover }) => (hover ? 'underline' : 'none')};
	}
`;
