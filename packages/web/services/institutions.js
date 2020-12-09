import { apiGet, apiPost } from './api';

export const getInstitutions = async () => {
	const response = await apiGet('institutions');

	const { data } = response;
	return data;
};

export const createInstitutions = async (payload) => {
	const response = await apiPost('institutions', payload);

	const { data } = response;
	return data;
};
