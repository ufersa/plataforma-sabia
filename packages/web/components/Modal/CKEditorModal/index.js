import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../../Editor'), {
	ssr: false,
});

const CKEditorModal = ({ form, name, config, onChange, defaultValue, renderWithController }) => {
	return (
		<Editor
			form={form}
			name={name}
			config={config}
			onChange={onChange}
			defaultValue={defaultValue}
			renderWithController={renderWithController}
		/>
	);
};

CKEditorModal.propTypes = {
	form: PropTypes.shape({}).isRequired,
	name: PropTypes.string.isRequired,
	config: PropTypes.shape({}),
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	renderWithController: PropTypes.bool,
};

CKEditorModal.defaultProps = {
	config: {},
	onChange: null,
	defaultValue: '',
	renderWithController: true,
};

export default CKEditorModal;
