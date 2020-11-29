class TechnologyReviewer {
	get rules() {
		return {
			reviewer: 'required|number|exists:reviewers,id',
		};
	}
}

module.exports = TechnologyReviewer;
