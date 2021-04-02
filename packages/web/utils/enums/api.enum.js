export const ROLES = {
	REVIEWER: 'REVIEWER',
	OWNER: 'OWNER',
};

export const ORDERING = {
	ASC: 'ASC',
	DESC: 'DESC',
};

export const HEADER = {
	TOTAL_ITEMS: 'X-Sabia-Total',
	TOTAL_PAGES: 'X-Sabia-TotalPages',
};

export const LIMITS = {
	chatMessages: 10,
};

export const MEASURE_UNIT = {
	hour: 'hour',
	day: 'day',
	week: 'week',
	month: 'month',
	unit: 'unit',
	other: 'other',
};

export const ERRORS = {
	VALIDATION_ERROR: 'VALIDATION_ERROR',
};

export const COMMON_COLUMNS = {
	CREATED_AT: 'created_at',
};

export default {
	ORDERING,
	HEADER,
	ROLES,
	LIMITS,
	ERRORS,
	COMMON_COLUMNS,
};
