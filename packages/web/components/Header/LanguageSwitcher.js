import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const supportedLanguages = [
	{
		label: 'English',
		code: 'en',
	},
	{
		label: 'Português',
		code: 'pt',
	},
];

const Select = styled.select`
	margin-right: 1rem;
`;

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

export default LanguageSwitcher;
