const technologyStatuses = {
	DRAFT: 'draft',
	PENDING: 'pending',
	IN_REVIEW: 'in_review',
	REQUESTED_CHANGES: 'requested_changes',
	CHANGES_MADE: 'changes_made',
	APPROVED: 'approved',
	REJECTED: 'rejected',
	PUBLISHED: 'published',
};

const reviewerStatuses = {
	PENDING: 'pending',
	APPROVED: 'approved',
	REJECTED: 'rejected',
};

module.exports = {
	technologyStatuses,
	reviewerStatuses,
};
