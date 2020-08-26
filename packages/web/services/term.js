/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Creates a term
 *
 * @param {string} term The label of the term that is being created
 * @param {string} taxonomy Taxonomy to be associated to the term
 * @returns {object} The created term
 */
export async function createTerm(term, taxonomy) {
	const response = await apiPost('terms', { term, taxonomy });

	if (response.status !== 200) {
		return false;
	}

	return response.data;
}
