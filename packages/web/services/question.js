/* eslint-disable import/prefer-default-export */
import { apiPut } from './api';

/**
 * Disable a question.
 *
 * @param {number} id Question ID
 * @returns {object} The newly updated question
 */
export const disableQuestion = async (id) => {
	const { data, status } = await apiPut(`questions/${id}/disable`);

	return status !== 200 ? false : data;
};

/**
 * Answer a question.
 *
 * @param {number} id Question ID
 * @param {string} answer The answer
 * @returns {object} The newly updated question
 */
export const answerQuestion = async (id, answer) => {
	const { data, status } = await apiPut(`questions/${id}/answer`, { answer });

	return status !== 200 ? false : data;
};
