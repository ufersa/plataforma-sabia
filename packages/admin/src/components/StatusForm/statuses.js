const statuses = {
	technologies: [
		{ id: 'draft', name: 'Draft' },
		{ id: 'pending', name: 'Pending' },
		{ id: 'in_review', name: 'In review' },
		{ id: 'requested_changes', name: 'Requested changes' },
		{ id: 'changes_made', name: 'Changes made' },
		{ id: 'approved', name: 'Approved' },
		{ id: 'rejected', name: 'Rejected' },
		{ id: 'published', name: 'Published' },
	],

	reviewers: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'approved', name: 'Approved' },
		{ id: 'rejected', name: 'Rejected' },
	],

	technologyUseStatuses: [
		{ id: 'private', name: 'Private' },
		{ id: 'enterprise', name: 'Enterprise' },
		{ id: 'local_government', name: 'Local government' },
		{ id: 'provincial_government', name: 'Provincial government' },
		{ id: 'federal_government', name: 'Federal government' },
		{ id: 'other', name: 'Other' },
	],

	fundingStatuses: [
		{ id: 'has_funding', name: 'Has funding' },
		{ id: 'wants_funding', name: 'Wants funding' },
		{ id: 'no_need_funding', name: 'No need funding' },
	],

	orders: [
		{ id: 'open', name: 'Open' },
		{ id: 'closed', name: 'Closed' },
		{ id: 'canceled', name: 'Canceled' },
	],

	questionStatuses: [
		{ id: 'unanswered', name: 'Unanswered' },
		{ id: 'answered', name: 'Answered' },
		{ id: 'disabled', name: 'Disabled' },
	],

	disclaimersTypes: [
		{ id: 'privacypolicy', name: 'Privacy policy' },
		{ id: 'register', name: 'Register' },
		{ id: 'technology', name: 'Technology' },
		{ id: 'reviewers', name: 'Reviewers' },
	],

	users: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'verified', name: 'Verified' },
		{ id: 'invited', name: 'Invited' },
	],
	announcements: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'published', name: 'Published' },
	],
};

export default statuses;
