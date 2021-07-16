/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');
const TermMeta = use('App/Models/TermMeta');
const { createTermSlug } = require('../../Utils/slugify');

const { errors, errorPayload, getTransaction } = require('../../Utils');

class TermController {
	/**
	 * Show a list of all terms with taxonomy.
	 * GET terms?taxonomy=
	 */
	async index({ request }) {
		const filters = request.all();
		return Term.query()
			.withFilters(filters)
			.withParams(request, { filterById: true });
	}

	/**
	 * Create/save a new term.
	 * POST terms
	 */
	async store({ request, response }) {
		const { term, taxonomy, parent_id, metas } = request.all();
		let taxonomyObj = null;
		if (taxonomy) {
			taxonomyObj = await Taxonomy.getTaxonomy(taxonomy);
		}
		const termSlug = await createTermSlug(term, taxonomyObj.id);
		const termInst = await Term.query()
			.where({
				slug: termSlug,
			})
			.first();
		if (termInst) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.UNIQUE_TERM_ERROR,
						request.antl('error.term.uniqueTermError'),
					),
				);
		}
		let trx;
		let newTerm;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			newTerm = await taxonomyObj.terms().create(
				{
					term,
					parent_id,
				},
				trx,
			);
			if (metas) {
				await newTerm.metas().createMany(metas, trx);
			}

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
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
			.withParams(request);
	}

	async syncronizeMetas(trx, metas, term) {
		const metaList = await term.metas().fetch();
		const metaKeysList = metaList.rows.map((meta) => meta.meta_key);
		const metaKeysListSend = metas.map((meta) => meta.meta_key);

		const metaKeysListToDelete = metaKeysList.filter(
			(metaKey) => !metaKeysListSend.includes(metaKey),
		);

		if (metaKeysListToDelete && metaKeysListToDelete.length) {
			await TermMeta.query()
				.where('term_id', term.id)
				.whereIn('meta_key', metaKeysListToDelete)
				.delete(trx);
		}

		const promises = metas.map(async (meta) => {
			let promise;
			const { meta_key, meta_value } = meta;
			let metaInst = await TermMeta.query()
				.where({ term_id: term.id, meta_key })
				.first();
			if (metaInst) {
				metaInst.merge({ meta_value });
				promise = metaInst.save(trx);
			} else {
				metaInst = await TermMeta.create({ meta_key, meta_value });
				promise = term.metas().save(metaInst, trx);
			}
			return promise;
		});

		await Promise.all(promises);
	}

	/**
	 * Update term details.
	 * PUT or PATCH terms/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const upTerm = await Term.getTerm(id);
		const { term, taxonomy_id, parent_id, metas } = request.all();

		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			if (taxonomy_id && taxonomy_id !== upTerm.taxonomy_id) {
				const taxonomy = await Taxonomy.findOrFail(taxonomy_id);
				await upTerm.taxonomy().dissociate(trx);
				await taxonomy.terms().save(upTerm, trx);
			}
			upTerm.merge({ term, parent_id });
			await upTerm.save(trx);
			if (metas) {
				await this.syncronizeMetas(trx, metas, upTerm);
				await upTerm.load('metas');
			}

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
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
	async destroy({ params, request, response }) {
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
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}

	/**
	 * Delete many terms with array of id.
	 * DELETE terms?ids=0,0,0
	 */
	async destroyMany({ request, response }) {
		const { ids } = request.params;

		let trx;
		let result;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await TermMeta.query()
				.whereIn('term_id', ids)
				.delete(trx);

			result = await Term.query()
				.whereIn('id', ids)
				.delete(trx);

			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}
}

module.exports = TermController;
