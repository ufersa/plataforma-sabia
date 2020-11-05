/* eslint-disable import/prefer-default-export */
import { apiPut } from './api';

export const updateCategoriesReviewer = async ({ categories }) => {
	const { data, status } = await apiPut('reviewers', { categories });
	return status !== 200 ? false : data;
};
