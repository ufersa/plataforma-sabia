import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

const supportedLanguages = [
	{
		label: 'EN',
		code: 'en',
	},
	{
		label: 'PT',
		code: 'pt',
	},
];

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const handleChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};

	return (
		<Select onChange={handleChange} defaultValue={i18n.language}>
			{supportedLanguages.map((lang) => (
				<option key={lang.code} value={lang.code}>
					{lang.label}
				</option>
			))}
		</Select>
	);
};

const Select = styled.select`
	padding: 0 0.5rem;
	height: 100%;
	border: none;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	font-weight: 500;
	font-size: 1.6rem;
	cursor: pointer;

	option {
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;

export default LanguageSwitcher;
