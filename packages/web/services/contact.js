/* eslint-disable import/prefer-default-export */

import { apiPost } from './api';

/**
 * Sends an e-mail message to the platform admin
 *
 * @param {object} values The fields value to send to API
 * @returns {void}
 */
export const sendContactMail = async (values = {}) => {
	const response = await apiPost('contact', { ...values });

	if (response.status !== 204) return false;

	return true;
};
