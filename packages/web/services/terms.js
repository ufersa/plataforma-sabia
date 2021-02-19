/* eslint-disable import/prefer-default-export */
import { apiGet, apiPost } from './api';
import { normalizeTerms, prepareTerms } from '../utils/technology';

/**
 * Creates a term
 *
 * @param {string} term The label of the term that is being created
 * @param {string} taxonomy Taxonomy to be associated to the term
 * @param {Array} metas Metas to be associated to the term
 * @returns {object} The created term
 */
export async function createTerm(term, taxonomy, metas = []) {
	const response = await apiPost('terms', { term, taxonomy, metas });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
}

/**
 * Creates a term
 *
 * @param {number} id Term id
 * @param {object} data Term data
 * @param {{}} options Term options
 * @returns {object} The created term
 */
export async function attachNewTerms(id, data, options = {}) {
	if (!id) {
		return false;
	}

	const terms = data.terms ? prepareTerms(data.terms) : false;
	const response = await apiPost(`technologies/${id}/terms`, { terms });

	if (response.status !== 200) {
		return false;
	}

	if (options.normalize && response.data.terms) {
		response.data.terms = normalizeTerms(response.data.terms);
	}

	if (response.status !== 200) {
		return false;
	}

	return response.data;
}

/**
 * GETs all terms
 *
 * @param {object} options Optional parameters
 * @returns {object} Terms data
 */
export const getTerms = async (options) => {
	const response = await apiGet('terms', { embed: true, ...options });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
