import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../../Editor'), {
	ssr: false,
});

const CKEditorModal = ({ form, name, config }) => {
	return <Editor form={form} name={name} config={config} />;
};

CKEditorModal.propTypes = {
	form: PropTypes.shape({}).isRequired,
	name: PropTypes.string.isRequired,
	config: PropTypes.shape({}),
};

CKEditorModal.defaultProps = {
	config: {},
};

export default CKEditorModal;
