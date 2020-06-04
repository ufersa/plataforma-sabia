const slugify = require('slugify');

const incrementSlugSuffix = (oldSlug) => {
	const slugSplitted = oldSlug.split('-');
	const lastElementIndex = slugSplitted.length - 1;
	// eslint-disable-next-line no-restricted-globals
	const isLastElementNumber = !isNaN(slugSplitted[lastElementIndex]);

	if (isLastElementNumber) {
		slugSplitted[lastElementIndex] = parseInt(slugSplitted[lastElementIndex], 10) + 1;
	} else {
		slugSplitted.push(1);
	}

	return slugSplitted.join('-');
};

const createUniqueSlug = async (model, entity, propertyToBeSlugfied, slugColumn = 'slug') => {
	const { [propertyToBeSlugfied]: propertyToBeSlugfiedValue } = entity;
	const slug = slugify(propertyToBeSlugfiedValue, { lower: true });

	const slugStoredPreviously = await model
		.query()
		.where(slugColumn, 'REGEXP', `${slug}.*(-(d*))?$`)
		.orderBy(slugColumn, 'desc')
		.first();

	if (slugStoredPreviously) {
		return incrementSlugSuffix(slugStoredPreviously.slug);
	}

	return slug;
};

module.exports = {
	createUniqueSlug,
	incrementSlugSuffix,
};
