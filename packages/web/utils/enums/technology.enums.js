export const STATUS = {
	DRAFT: 'draft',
	PENDING: 'pending',
	IN_REVIEW: 'in_review',
	REQUESTED_CHANGES: 'requested_changes',
	CHANGES_MADE: 'changes_made',
	APPROVED: 'approved',
	REJECTED: 'rejected',
	PUBLISHED: 'published',
};

export const TYPES = [
	{ label: 'Equipamento', value: 'equipment' },
	{ label: 'Material', value: 'material' },
	{ label: 'Metodologia', value: 'methodology' },
	{ label: 'Modelo', value: 'model' },
	{ label: 'Processo', value: 'process' },
	{ label: 'Serviço', value: 'service' },
	{ label: 'Software', value: 'software' },
	{ label: 'Outro', value: 'other' },
];

export const LOCATIONS = {
	WHO_DEVELOP: 'who_develop',
	WHERE_IS_ALREADY_IMPLEMENTED: 'where_is_already_implemented',
	WHERE_CAN_BE_APPLIED: 'where_can_be_applied',
};

export default {
	LOCATIONS,
	STATUS,
	TYPES,
};
