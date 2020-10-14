import React from 'react';
import styled from 'styled-components';

const IndicatorStyled = styled.span`
	color: ${({ theme }) => theme.colors.red};
	margin-left: 0.5rem;
	display: inline-block;
`;

const Indicator = () => {
	return <IndicatorStyled aria-label="Indicador visual de campo obrigatório">*</IndicatorStyled>;
};

export default Indicator;
