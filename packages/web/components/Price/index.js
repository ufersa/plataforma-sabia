import React from 'react';
import PropTypes from 'prop-types';

const currencySimbol = {
	BRL: 'R$',
	USD: '$',
};

const Price = ({ amount, currency }) => {
	return amount ? (
		<span>
			{`${currencySimbol[currency]} ${new Intl.NumberFormat([], {
				currency,
			}).format(amount)}`}
		</span>
	) : null;
};

Price.propTypes = {
	amount: PropTypes.number.isRequired,
	currency: PropTypes.string,
};

Price.defaultProps = {
	currency: 'BRL',
};

export default Price;
