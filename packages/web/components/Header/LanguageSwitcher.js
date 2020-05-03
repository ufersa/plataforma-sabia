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
		<Select onChange={handleChange} defaultValue={supportedLanguages[1].code}>
			{supportedLanguages.map((lang) => (
				<option
					defaultValue={i18n.language}
					key={lang.code}
					value={lang.code}
					selected={lang.code === i18n.language}
				>
					{lang.label}
				</option>
			))}
		</Select>
	);
};

export default LanguageSwitcher;
