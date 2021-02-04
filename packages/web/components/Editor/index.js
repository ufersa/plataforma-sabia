import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Controller } from 'react-hook-form';

const Editor = ({ config, form, name, disabled }) => {
	const { control } = form;

	return (
		<Controller
			as={<CKEditor editor={ClassicEditor} config={config} />}
			onChange={([, editor]) => editor.getData()}
			control={control}
			name={name}
			disabled={disabled}
		/>
	);
};

Editor.propTypes = {
	form: PropTypes.shape({
		control: PropTypes.shape({}),
	}).isRequired,
	config: PropTypes.shape({}),
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

Editor.defaultProps = {
	config: {},
	disabled: false,
};

export default Editor;
