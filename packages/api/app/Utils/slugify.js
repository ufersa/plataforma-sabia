const slugify = require('slugify');

const incrementSlugSuffix = (oldSlug) => {
	const slugSplitted = oldSlug.split('-');
	const lastElementIndex = slugSplitted.length - 1;
	const isLastElementNumber = Number.isInteger(Number(slugSplitted[lastElementIndex]));

	if (isLastElementNumber) {
		slugSplitted[lastElementIndex] = parseInt(slugSplitted[lastElementIndex], 10) + 1;
	} else {
		slugSplitted.push(1);
	}

	return slugSplitted.join('-');
};

const createUniqueSlug = async (model, propertyToBeSlugfied, slugColumn = 'slug') => {
	const slug = slugify(propertyToBeSlugfied, { lower: true, remove: /[*+~.()'"!:@]/g });

	const slugStoredPreviously = await model
		.query()
		.where(slugColumn, 'REGEXP', `^${slug}.*(-(d*))?$`)
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
