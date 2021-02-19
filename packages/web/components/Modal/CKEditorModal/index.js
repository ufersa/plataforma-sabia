import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import styled, { css } from 'styled-components';

import { RectangularButton } from '../../Button';
import { Spinner } from '../../Loading';

const Editor = dynamic(() => import('../../Editor'), {
	ssr: false,
	loading: () => <Spinner />,
});

const Modal = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		flex-direction: column;

		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		padding: 1.2rem;

		max-width: 95vw;
		width: 600px;
		.ck-editor__editable_inline {
			width: 100%;
			height: 300px;
		}

		button {
			margin-top: 1.6rem;
		}
	`}
`;

const CKEditorModal = ({
	form,
	name,
	config,
	onChange,
	defaultValue,
	renderWithController,
	closeModal,
}) => {
	return (
		<Modal>
			<Editor
				form={form}
				name={name}
				config={config}
				onChange={onChange}
				defaultValue={defaultValue}
				renderWithController={renderWithController}
			/>
			<RectangularButton colorVariant="green" variant="filled" onClick={closeModal}>
				Fechar
			</RectangularButton>
		</Modal>
	);
};

CKEditorModal.propTypes = {
	form: PropTypes.shape({}).isRequired,
	name: PropTypes.string.isRequired,
	config: PropTypes.shape({}),
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	renderWithController: PropTypes.bool,
	closeModal: PropTypes.func.isRequired,
};

CKEditorModal.defaultProps = {
	config: {},
	onChange: null,
	defaultValue: '',
	renderWithController: true,
};

export default CKEditorModal;
