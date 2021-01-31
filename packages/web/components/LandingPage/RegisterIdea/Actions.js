import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

const Actions = ({ disableSubmit }) => {
	return (
		<StyledActions>
			<Button type="submit" variant="secondary" disabled={disableSubmit}>
				Enviar minha ideia
			</Button>
		</StyledActions>
	);
};

Actions.propTypes = {
	disableSubmit: PropTypes.bool.isRequired,
};

const StyledActions = styled.div`
	margin-top: 1.8rem;

	> button {
		width: 100%;
	}
`;

export default Actions;
