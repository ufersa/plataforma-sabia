import { apiPost, apiDelete } from './api';

/**
 * Upload file to our API
 *
 * @param {Array<{}>} files Array of files to be uploaded
 * @returns {Promise<{}>} A promise that resolves with the upload information
 */
export async function upload(files) {
	const response = await apiPost('uploads', 'POST', {
		body: files,
		isAttachmentUpload: true,
	});
	if (response.status !== 200) {
		return false;
	}

	return response.data;
}

/**
 * Delete file from our API
 *
 * @param {string} id the file id stored in our database
 * @returns {Promise<{}>} A promise that resolves with the upload information
 */
export async function deleteUpload(id) {
	const response = await apiDelete(`uploads/${id}`);

	return response.data;
}
