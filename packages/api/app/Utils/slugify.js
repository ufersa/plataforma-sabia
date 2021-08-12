const slugify = require('slugify');

const Database = use('Database');

const removeAccents = (text) => {
	let textWithoutAccents;
	textWithoutAccents = text.toLowerCase();
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
	textWithoutAccents = textWithoutAccents.replace(new RegExp('[Ç]', 'gi'), 'c');
	return textWithoutAccents;
};

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

const createUniqueSlug = async (
	model,
	propertyToBeSlugfied,
	slugColumn = 'slug',
	replacement = '-',
) => {
	const slug = slugify(removeAccents(propertyToBeSlugfied), {
		replacement,
		lower: true,
		remove: /[^\w\s]/g,
	});

	const slugStoredPreviously = await model
		.query()
		.where(slugColumn, 'LIKE', `${slug}%`)
		.orderByRaw(`substring(${slugColumn},length('${slug}-'))*1`)
		.first();

	if (slugStoredPreviously) {
		return incrementSlugSuffix(slugStoredPreviously.slug);
	}

	return slug;
};

const createTermSlug = async (term, taxonomy_id) => {
	const slug = slugify(term, { lower: true, remove: /[*+~.()'"!:@]/g });
	const taxonomy = await Database.table('taxonomies')
		.where({ id: taxonomy_id })
		.first();
	const taxonomyPrefix = taxonomy.taxonomy.toLowerCase();
	return `${taxonomyPrefix}-${slug}`;
};

module.exports = {
	createUniqueSlug,
	incrementSlugSuffix,
	createTermSlug,
};
