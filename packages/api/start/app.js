const path = require('path');
/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
	'@adonisjs/framework/providers/AppProvider',
	'@adonisjs/framework/providers/ViewProvider',
	'@adonisjs/auth/providers/AuthProvider',
	'@adonisjs/bodyparser/providers/BodyParserProvider',
	'@adonisjs/cors/providers/CorsProvider',
	'@adonisjs/lucid/providers/LucidProvider',
	'@adonisjs/validator/providers/ValidatorProvider',
	'@adonisjs/antl/providers/AntlProvider',
	'@adonisjs/cors/providers/CorsProvider',
	'@adonisjs/mail/providers/MailProvider',
	'@rocketseat/adonis-bull/providers/Bull',
	path.join(__dirname, '..', 'providers', 'AlgoliaProvider'),
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
	'@adonisjs/lucid/providers/MigrationsProvider',
	'@adonisjs/vow/providers/VowProvider',
	'@rocketseat/adonis-bull/providers/Command',
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = ['App/Commands/AlgoliaIndex'];

module.exports = { providers, aceProviders, aliases, commands };
