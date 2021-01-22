/* eslint-disable */
const { saveIndex } = require('../../Utils/Algolia');

class SyncWithAlgolia {
	checkCondition(modelInstance, condition) {
		const allowedConditionTypes = ['boolean', 'function'];
		let passInConditions = true;

		if (!allowedConditionTypes.includes(typeof condition)) {
			throw new TypeError('Condition param should be of type boolean or function');
		}

		if (typeof condition === 'function') {
			const result = condition(modelInstance);

			if (typeof result !== 'boolean') {
				throw new TypeError('Callback condition error should return an boolean value');
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
			if (!this.checkCondition(modelInstance, condition)) {
				return false;
			}

			if (!this.checkObjectId(modelInstance)) {
				throw new Error('You need to define the "objectID" as a computed field');
			}

			if (loads.length) {
				let relationshipsToLoad = [...new Set(loads)];

				relationshipsToLoad = relationshipsToLoad.filter((relationship) => {
					const alreadyHasBeenLoaded = !!modelInstance.getRelated(relationship);

					console.log({
						relationship,
						relations: modelInstance.$relations,
						alreadyHasBeenLoaded,
					});

					return !alreadyHasBeenLoaded ? relationship : null;
				});

				console.log({ relationshipsToLoad });

				await modelInstance.loadMany(relationshipsToLoad);
			}

			console.log({
				cond: this.checkCondition(modelInstance, condition),
				obj: this.checkObjectId(modelInstance),
				loads,
				index,
				json: modelInstance.toJSON(),
				model: modelInstance,
			});

			await saveIndex(index, modelInstance.toJSON(), options);
			return true;
		});

		// Model.addHook('afterDelete', (modelInstance) => {});
	}
}

module.exports = SyncWithAlgolia;
