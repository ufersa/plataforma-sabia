const { cache } = require('../../Utils');

class Cache {
	/**
	 * Register methods
	 *
	 * @param {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model Model
	 * @param {object} [options={}] Trait options
	 * @param {string} [options.prefix] Key prefix
	 */
	register(Model, options = {}) {
		Model.invalidateCache = async () => {
			return cache.deleteByPrefix(options.prefix || Model.name);
		};
	}
}

module.exports = Cache;
