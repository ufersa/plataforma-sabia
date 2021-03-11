const { ServiceProvider } = require('@adonisjs/fold');

class MyServiceProvider extends ServiceProvider {
	boot() {
		const Request = use('Adonis/Src/Request');
		Request.macro('has', (filters = {}, value = '') => Object.keys(filters).includes(value));
	}

	register() {}
}

module.exports = MyServiceProvider;
