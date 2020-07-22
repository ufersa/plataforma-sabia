/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');
const TermMeta = use('App/Models/TermMeta');

const { antl, errors, errorPayload } = require('../../Utils');

class TermController {
	/**
	 * Show a list of all terms with taxonomy.
	 * GET terms?taxonomy=
	 */
	async index({ request }) {
		const filters = request.all();

		return Term.query()
			.withParams(request.params)
			.withFilters(filters)
			.fetch();
	}

	/**
	 * Create/save a new term.
	 * POST terms
	 */
	async store({ request }) {
		const { term, slug, taxonomy, meta } = request.all();
		let taxonomyObj = null;
		if (taxonomy) {
			taxonomyObj = await Taxonomy.getTaxonomy(taxonomy);
		}
		const newTerm = await taxonomyObj.terms().create({
			term,
			slug,
		});
		if (meta) {
			const metas = await TermMeta.createMany(meta);
			await newTerm.metas().saveMany(metas);
		}
		await newTerm.load('taxonomy');
		await newTerm.load('metas');
		return newTerm;
	}

	/**
	 * Get a single term.
	 * GET terms/:id
	 */
	async show({ request }) {
		return Term.query()
			.getTerm(request.params.id)
			.withParams(request.params)
			.firstOrFail();
	}

	async syncronizeMetas(metas, term) {
		// Metas to update
		const updatePromises = metas.map(async (meta) => {
			let updatePromise;
			if (meta.id) {
				const metaInst = await TermMeta.findOrFail(meta.id);
				metaInst.merge(meta);
				updatePromise = metaInst.save();
			}
			return updatePromise;
		});

		await Promise.all(updatePromises);

		// Metas to delete
		const metaList = await term.metas().fetch();
		const metaListIds = metaList.rows.map((meta) => meta.id);

		const metaListIdsToDelete = metaListIds.filter(
			(metaListId) => metas.findIndex((meta) => meta.id === metaListId) === -1,
		);

		if (metaListIdsToDelete && metaListIdsToDelete.length) {
			await TermMeta.query()
				.whereIn('id', metaListIdsToDelete)
				.delete();
		}

		// Costs to create
		const metasToCreate = metas.filter((meta) => meta.id === undefined);

		if (metasToCreate && metasToCreate.length) {
			const metasInsts = await TermMeta.createMany(metasToCreate);
			await term.metas().saveMany(metasInsts);
		}
	}

	/**
	 * Update term details.
	 * PUT or PATCH terms/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upTerm = await Term.getTerm(id);
		const { term, slug, taxonomyId, meta } = request.all();
		if (taxonomyId && taxonomyId !== upTerm.taxonomy_id) {
			const taxonomy = await Taxonomy.findOrFail(taxonomyId);
			await upTerm.taxonomy().dissociate();
			await taxonomy.terms().save(upTerm);
		}
		upTerm.merge({ term, slug });
		await upTerm.save();
		if (meta) {
			await this.syncronizeMetas(meta, upTerm);
			await upTerm.load('metas');
		}
		return upTerm.toJSON();
	}

	/**
	 * Update term meta details.
	 * PUT or PATCH terms/:id/meta
	 */
	async updateMeta({ params, request }) {
		const { id } = params;
		const { meta_key, meta_value } = request.all();
		const upTerm = await Term.getTerm(id);

		let meta = await TermMeta.query()
			.where({ term_id: upTerm.id })
			.where({ meta_key })
			.first();
		if (meta) {
			meta.merge({ meta_value });
			await meta.save();
		} else {
			meta = await TermMeta.create({ meta_key, meta_value });
			await upTerm.metas().save(meta);
		}
		return meta;
	}

	/**
	 * Delete a term with id.
	 * DELETE terms/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		const term = await Term.getTerm(id);

		const metas = await term.metas().fetch();
		if (metas.rows && metas.rows.length) {
			const metaListIdsToDelete = metas.rows.map((meta) => meta.id);
			await TermMeta.query()
				.whereIn('id', metaListIdsToDelete)
				.delete();
		}

		const result = await term.delete();

		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}
}

module.exports = TermController;
