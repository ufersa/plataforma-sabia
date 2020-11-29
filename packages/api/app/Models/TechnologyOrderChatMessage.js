/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TechnologyOrderChatMessage extends Model {
	static boot() {
		super.boot();
	}
}

module.exports = TechnologyOrderChatMessage;
