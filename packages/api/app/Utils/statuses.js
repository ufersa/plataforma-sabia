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

const technologyUseStatuses = {
	PRIVATE: 'private',
	ENTERPRISE: 'enterprise',
	LOCAL_GOVERNMENT: 'local_government',
	PROVINCIAL_GOVERNMENT: 'provincial_government',
	FEDERAL_GOVERNMENT: 'federal_government',
	OTHER: 'other',
};

const fundingStatuses = {
	HAS_FUNDING: 'has_funding',
	WANTS_FUNDING: 'wants_funding',
	NO_NEED_FUNDING: 'no_need_funding',
};

const orderStatuses = {
	OPEN: 'open',
	CLOSED: 'closed',
	CANCELED: 'canceled',
};

const questionStatuses = {
	UNANSWERED: 'unanswered',
	ANSWERED: 'answered',
	DISABLED: 'disabled',
};

const disclaimersTypes = {
	PRIVACYPOLICY: 'privacypolicy',
	REGISTER: 'register',
	TECHNOLOGY: 'technology',
	REVIEWERS: 'reviewers',
};

const announcementStatuses = {
	PENDING: 'pending',
	PUBLISHED: 'published',
};

const chatStatusesTypes = {
	ACTIVE: 'active',
	DELETED: 'deleted',
};

const chatMessagesTypes = {
	TEXT: 'text',
};

const chatTypes = {
	TECHNOLOGY_ORDER: 'technology-order',
};

const institutionsTypes = {
	PUBLIC: 'public',
	PRIVATE: 'private',
	MIXED: 'mixed',
	OTHER: 'other',
};

const institutionsCategories = {
	UNIVERSITY: 'university',
	INSTITUTE: 'institute',
	ASSOCIATION: 'association',
	FOUNDATION: 'foundation',
	COOPERATIVE: 'cooperative',
	COMPANY: 'company',
	OTHER: 'other',
};

const messagesTypes = {
	EMAIL: 'email',
	NOTIFICATION: 'notification',
};

const messageStatuses = {
	READ: 'read',
	NEW: 'new',
};

module.exports = {
	technologyStatuses,
	reviewerStatuses,
	technologyUseStatuses,
	fundingStatuses,
	orderStatuses,
	questionStatuses,
	disclaimersTypes,
	announcementStatuses,
	chatStatusesTypes,
	chatMessagesTypes,
	chatTypes,
	institutionsTypes,
	institutionsCategories,
	messagesTypes,
	messageStatuses,
};
