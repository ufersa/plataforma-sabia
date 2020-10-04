import React from 'react';
import PropTypes from 'prop-types';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';

const ClearFiltersButton = ({ items, refine }) => {
	const { t } = useTranslation(['search']);

	const onClick = () => {
		refine(items);
	};

	return (
		<Button onClick={onClick} uppercase={false} variant="secondary">
			{t('resetFilters')}
		</Button>
	);
};

ClearFiltersButton.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	refine: PropTypes.func.isRequired,
};

export default connectCurrentRefinements(ClearFiltersButton);
