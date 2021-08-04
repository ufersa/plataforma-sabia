import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Controller } from 'react-hook-form';

const Editor = ({ config, form, name, disabled, onChange, defaultValue, renderWithController }) => {
	const { control, setValue } = form;

	if (renderWithController) {
		return (
			<Controller
				name={name}
				render={({ onChange: _onChange }) => (
					<CKEditor
						editor={ClassicEditor}
						config={config}
						onChange={([, editor]) => {
							const editorData = editor.getData();

							if (onChange) {
								onChange(editorData);
							}

							return _onChange(editorData);
						}}
						data={defaultValue}
					/>
				)}
				control={control}
				disabled={disabled}
			/>
		);
	}

	let timerOnChange = null;

	const handleChangeDebounced = (_, editor) => {
		clearTimeout(timerOnChange);
		timerOnChange = setTimeout(() => {
			const editorData = editor.getData();

			setValue(name, editorData, { shouldDirty: true });

			if (onChange) {
				onChange(editorData);
			}
		}, 500);
	};

	return (
		<CKEditor
			editor={ClassicEditor}
			config={config}
			name={name}
			onChange={handleChangeDebounced}
			data={defaultValue}
		/>
	);
};

Editor.propTypes = {
	form: PropTypes.shape({
		control: PropTypes.shape({}),
		setValue: PropTypes.func,
	}).isRequired,
	config: PropTypes.shape({}),
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	renderWithController: PropTypes.bool,
};

Editor.defaultProps = {
	config: {},
	disabled: false,
	onChange: null,
	defaultValue: '',
	renderWithController: true,
};

export default Editor;
