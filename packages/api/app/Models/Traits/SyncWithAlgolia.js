const { initIndex, saveIndex } = require('../../Utils/Algolia');

class SyncWithAlgolia {
	constructor() {
		this.errors = {
			MISSING_OBJECTID: 'You need to define the "objectID" as a computed field',
			PERSIST_OBJECT: 'You need to persist the object before',
			CONDITION_PARAM: 'Condition param should be of type boolean or function',
			CALLBACK_CONDITION_RETURN: 'Callback condition error should return an boolean value',
		};
	}

	checkPersistence(modelInstance) {
		return !!modelInstance.$persisted;
	}

	checkCondition(modelInstance, condition) {
		const allowedConditionTypes = ['boolean', 'function'];
		let passInConditions = true;

		if (!allowedConditionTypes.includes(typeof condition)) {
			throw new TypeError(this.errors.CONDITION_PARAM);
		}

		if (typeof condition === 'function') {
			const result = condition(modelInstance);

			if (typeof result !== 'boolean') {
				throw new TypeError(this.errors.CALLBACK_CONDITION_RETURN);
			}

			passInConditions = result;
		}

		if (typeof condition === 'boolean') {
			passInConditions = condition;
		}

		return passInConditions;
	}

	checkObjectId(modelInstance) {
		return !!modelInstance.toJSON().objectID;
	}

	/**
	 * Register Trait
	 *
	 * @param {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model Adonis Model
	 * @param {*} options Trait options
	 */
	register(Model, { index = '', condition = true, loads = [], options = {} }) {
		Model.addHook('afterSave', async (modelInstance) => {
			if (!this.checkPersistence(modelInstance)) {
				throw new Error(this.errors.PERSIST_OBJECT);
			}

			if (!this.checkCondition(modelInstance, condition)) {
				return false;
			}

			if (!this.checkObjectId(modelInstance)) {
				throw new Error(this.errors.MISSING_OBJECTID);
			}

			if (loads.length) {
				let relationshipsToLoad = [...new Set(loads)];

				relationshipsToLoad = relationshipsToLoad.filter((relationship) => {
					const alreadyBeenLoaded = !!modelInstance.getRelated(relationship);
					return !alreadyBeenLoaded ? relationship : null;
				});

				if (relationshipsToLoad.length) {
					await modelInstance.loadMany(relationshipsToLoad);
				}
			}

			await saveIndex(index, modelInstance.toJSON(), options);
			return true;
		});

		Model.addHook('afterDelete', async (modelInstance) => {
			const { deleteObject } = initIndex('idea');

			if (!this.checkObjectId(modelInstance)) {
				throw new Error(this.errors.MISSING_OBJECTID);
			}

			await deleteObject(modelInstance.toJSON().objectID);
			return true;
		});
	}
}

module.exports = SyncWithAlgolia;
