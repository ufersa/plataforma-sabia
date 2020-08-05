/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import Help from './Help';
import { Row } from './styles';

const Wrapper = styled.div`
	margin-bottom: 3rem;
`;

const Repeater = ({
	childsComponent,
	endComponent,
	name,
	emptyValue,
	form,
	title,
	help,
	noInitialRow,
}) => {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	useEffect(() => {
		if (!fields.length && !noInitialRow) {
			append(emptyValue);
		}
	}, [fields, noInitialRow, append, emptyValue]);

	return (
		<Wrapper>
			<Row>
				{title ? <h3>{title}</h3> : null}
				{help && <Help id={name} HelpComponent={help} />}
			</Row>
			{fields.map((item, index) => (
				<Fragment key={item.id}>
					{childsComponent({
						item,
						control,
						fields,
						append,
						remove,
						index,
					})}
				</Fragment>
			))}
			{endComponent ? endComponent({ append, emptyValue }) : null}
		</Wrapper>
	);
};

Repeater.propTypes = {
	emptyValue: PropTypes.shape({}).isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	childsComponent: PropTypes.func.isRequired,
	endComponent: PropTypes.func,
	help: PropTypes.node,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
	}).isRequired,
	noInitialRow: PropTypes.bool,
};

Repeater.defaultProps = {
	endComponent: null,
	title: null,
	help: null,
	noInitialRow: false,
};

export default Repeater;
