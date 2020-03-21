/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route');

Route.post('/register', 'AuthController.register');
Route.post('/auth', 'AuthController.auth');

Route.get('/', 'AppController.index').middleware(['auth']);
