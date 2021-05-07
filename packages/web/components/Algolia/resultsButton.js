import React from 'react';
import PropTypes from 'prop-types';
import { connectStats } from 'react-instantsearch-dom';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '../Button';

const ResultsButton = ({ nbHits, onClick }) => {
	const { t } = useTranslation(['search']);
	return (
		<Button onClick={onClick} uppercase={false}>
			{t('seeResults', { count: nbHits })}
		</Button>
	);
};

ResultsButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	nbHits: PropTypes.number.isRequired,
};

export default connectStats(ResultsButton);
