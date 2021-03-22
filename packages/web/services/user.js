/* eslint-disable import/prefer-default-export */
import { apiGet, apiPut, apiPost } from './api';
import { HEADER as apiHeaderEnum } from '../utils/enums/api.enum';

/**
 * Updates the password of a logged in user.
 *
 * @param {object} data User data
 * @param {object} data.currentPassword The current password
 * @param {object} data.newPassword The new password
 *
 * @returns {object} The success message or an error object.
 */
export const updateUserPassword = async ({ currentPassword, newPassword }) => {
	const response = await apiPut(`user/change-password`, { currentPassword, newPassword });

	return response.data;
};

/**
 * Updates the email of a logged in user.
 *
 * @param {string} newEmail The new email
 * @returns {object} The success message or an error object.
 */
export const requestEmailChange = async (newEmail) => {
	const response = await apiPost(`user/change-email`, { email: newEmail, scope: 'web' });

	return response.data;
};

/**
 * Updates an existing user.
 *
 * @param {number} id The id of the user to update
 * @param {object} data The user data.
 *
 * @returns {object} The updated user.
 */
export const updateUser = async (id, data) => {
	if (!id) {
		return false;
	}

	const response = await apiPut(`users/${id}`, data);

	return response.data;
};

/**
 * Sends a request to ask for reviewer permission.
 *
 * @param {number} id The id of the user
 * @param {object} categories The categories to be a reviewer
 *
 * @returns {object} The updated user.
 */
export const requestToBeReviewer = async (id, { categories } = {}) => {
	if (!id || !categories) {
		return false;
	}

	const response = await apiPost('reviewers', {
		user_id: id,
		categories,
		disclaimers: Array.from(Array(15).keys()),
	});

	if (response.status !== 200) return false;

	return response.data;
};

/**
 * Fetches technologies of a given user.
 *
 * @param {number} userId The user id.
 * @param {object} options Optional params.
 */
export const getUserTechnologies = async (userId, options = { embed: true }) => {
	const response = await apiGet(`users/${userId}`, { embed: options.embed });

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	return data.technologies;
};

/**
 * Fetches favorite technologies of a given user.
 *
 * @param {number} userId The user id.
 * @param {object} options Optional params
 */
export const getUserBookmarks = async (userId, options = { embed: true }) => {
	const response = await apiGet(`user/${userId}/bookmarks`, { ...options, embed: true });

	if (response.status !== 200) {
		return false;
	}

	const { data, headers } = response;

	const totalPages = headers['X-Sabia-Total-Pages'];
	const totalItems = headers['X-Sabia-Total'];

	return { data, totalPages, totalItems };
};

/**
 * Fetches favorite technologies of a given user.
 *
 * @param {object} options Optional params
 */
export const getReviewerUser = async (options = { embed: false }) => {
	const response = await apiGet(`reviewer`, { ...options });

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	return { data };
};

/**
 * Fetches questions of a given user.
 *
 * @param {object} options Optional params
 */
export const getUserQuestions = async (options = { embed: true }) => {
	const response = await apiGet(`questions`, { ...options, embed: true });

	if (response.status !== 200) {
		return false;
	}

	const { data, headers } = response;

	const totalPages = Number(headers.get(apiHeaderEnum.TOTAL_PAGES) || 0);
	const totalItems = Number(headers.get(apiHeaderEnum.TOTAL_ITEMS) || 0);

	return { data, totalPages, totalItems };
};

/**
 * Fetches the count of unanswered questions of a given user.
 */
export const getUserUnansweredQuestions = async () => {
	const response = await apiGet(`questions/unanswered`);

	if (response.status !== 200) {
		return false;
	}

	const { data } = response;

	return { data };
};

/**
 * Fetches user services
 *
 * @param {object} options Optional params
 * @returns {object} User services with pagination
 */
export const getUserServices = async (options) => {
	const response = await apiGet('services/my-services', { embed: true, ...options });

	if (response.status !== 200) {
		return false;
	}

	const { data, headers } = response;

	const totalPages = Number(headers.get(apiHeaderEnum.TOTAL_PAGES));
	const totalItems = Number(headers.get(apiHeaderEnum.TOTAL_ITEMS));

	return { services: data, totalPages, totalItems };
};
