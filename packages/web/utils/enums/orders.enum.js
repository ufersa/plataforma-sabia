export const STATUS = {
	DEAL_STRUCK: 'closed',
	DEAL_ONGOING: 'open',
	DEAL_CANCELLED: 'canceled',
	DEAL_REQUESTED: 'requested',
};

export const FUNDING = {
	HAS_FUNDING: 'has_funding',
	WANTS_FUNDING: 'wants_funding',
	NO_NEED_FUNDING: 'no_need_funding',
};

export const USE = {
	PRIVATE: 'private',
	ENTERPRISE: 'enterprise',
	LOCAL_GOVERNMENT: 'local_government',
	PROVINCIAL_GOVERNMENT: 'provincial_government',
	FEDERAL_GOVERNMENT: 'federal_government',
	OTHER: 'other',
};

export default {
	STATUS,
	FUNDING,
	USE,
};
