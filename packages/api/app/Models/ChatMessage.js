/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ChatMessage extends Model {
	static boot() {
		super.boot();
	}
}

module.exports = ChatMessage;
