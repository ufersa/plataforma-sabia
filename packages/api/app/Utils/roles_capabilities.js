const ROLES = {
	DEFAULT_USER: 'DEFAULT_USER',
	RESEARCHER: 'RESEARCHER',
	INVESTOR: 'INVESTOR',
	REVIEWER: 'REVIEWER',
	ADMIN: 'ADMIN',
};

const PERMISSIONS = {
	// Roles
	CREATE_ROLES: {
		permission: 'create-roles',
		description: 'Permite criar papeis no sistema',
	},
	LIST_ROLES: {
		permission: 'list-roles',
		description: 'Permite listar papeis no sistema',
	},
	VIEW_ROLES: {
		permission: 'details-roles',
		description: 'Permite detalhar papeis no sistema',
	},
	UPDATE_ROLES: {
		permission: 'update-roles',
		description: 'Permite editar papeis no sistema',
	},
	DELETE_ROLES: {
		permission: 'delete-roles',
		description: 'Permite excluir papeis no sistema',
	},
	// Permissions
	CREATE_PERMISSIONS: {
		permission: 'create-permissions',
		description: 'Permite criar permissões no sistema',
	},
	LIST_PERMISSIONS: {
		permission: 'list-permissions',
		description: 'Permite listar permissões no sistema',
	},
	VIEW_PERMISSIONS: {
		permission: 'details-permissions',
		description: 'Permite detalhar permissões no sistema',
	},
	UPDATE_PERMISSIONS: {
		permission: 'update-permissions',
		description: 'Permite editar permissões no sistema',
	},
	DELETE_PERMISSIONS: {
		permission: 'delete-permissions',
		description: 'Permite excluir permissões no sistema',
	},
	// Taxonomies Permissions
	CREATE_TAXONOMIES: {
		permission: 'create-taxonomies',
		description: 'Permite criar taxonomias no sistema',
	},
	UPDATE_TAXONOMIES: {
		permission: 'update-taxonomies',
		description: 'Permite editar taxonomias no sistema',
	},
	DELETE_TAXONOMIES: {
		permission: 'delete-taxonomies',
		description: 'Permite excluir taxonomias no sistema',
	},
	// Terms
	CREATE_TERMS: {
		permission: 'create-terms',
		description: 'Permite criar termos no sistema',
	},
	UPDATE_TERMS: {
		permission: 'update-terms',
		description: 'Permite editar termos no sistema',
	},
	DELETE_TERMS: {
		permission: 'delete-terms',
		description: 'Permite excluir termos no sistema',
	},
	// technologies
	CREATE_TECHNOLOGIES: {
		permission: 'create-technologies',
		description: 'Permite criar tecnologias no sistema',
	},
	LIST_TECHNOLOGIES: {
		permission: 'list-technologies',
		description: 'Permite listar tecnologias no sistema',
	},
	UPDATE_TECHNOLOGIES: {
		permission: 'update-technologies',
		description: 'Permite editar tecnologias no sistema',
	},
	DELETE_TECHNOLOGIES: {
		permission: 'delete-technologies',
		description: 'Permite excluir tecnologias no sistema',
	},
	UPDATE_TECHNOLOGY: {
		permission: 'update-technology',
		description: 'Permite editar a própria tecnologia no sistema',
	},
	DELETE_TECHNOLOGY: {
		permission: 'delete-technology',
		description: 'Permite excluir a própria tecnologia no sistema',
	},
	// Users
	CREATE_USERS: {
		permission: 'create-users',
		description: 'Permite criar usuários no sistema',
	},
	LIST_USERS: {
		permission: 'list-users',
		description: 'Permite listar usuários no sistema',
	},
	VIEW_USERS: {
		permission: 'details-users',
		description: 'Permite detalhar usuários no sistema',
	},
	UPDATE_USERS: {
		permission: 'update-users',
		description: 'Permite editar usuários no sistema',
	},
	DELETE_USERS: {
		permission: 'delete-users',
		description: 'Permite excluir usuários no sistema',
	},
	VIEW_USER: {
		permission: 'details-user',
		description: 'Permite detalhar o próprio usuário no sistema',
	},
	UPDATE_USER: {
		permission: 'update-user',
		description: 'Permite editar o próprio usuário no sistema',
	},
	DELETE_USER: {
		permission: 'delete-user',
		description: 'Permite excluir o próprio usuário no sistema',
	},
};

const DEFAULT_USER = [
	// users
	PERMISSIONS.UPDATE_USER,
	PERMISSIONS.VIEW_USER,
	PERMISSIONS.DELETE_USER,
];
const RESEARCHER = [
	...DEFAULT_USER,
	PERMISSIONS.CREATE_TECHNOLOGIES,
	PERMISSIONS.UPDATE_TECHNOLOGY,
	PERMISSIONS.ASSOCIATE_TECHNOLOGY_USERS,
	PERMISSIONS.DELETE_TECHNOLOGY_USERS,
];

const ROLES_PERMISSIONS = {
	[ROLES.DEFAULT_USER]: DEFAULT_USER,
	[ROLES.RESEARCHER]: RESEARCHER,
	// INVESTOR: [],
	// REVIEWER: [],
	[ROLES.ADMIN]: 'ALL',
};

/**
 * Returns all permissions associated with a given role.
 *
 * @param {string} role Role name.
 *
 * @returns {object[]}
 */
const getRolePermissions = (role) => ROLES_PERMISSIONS[role] || [];

/**
 * Returns the permission middleware definition for the list of permission.
 *
 * @param {object[]} permissions Array of permission objects.
 *
 * @returns {string}
 */
const getMiddlewarePermissions = (permissions) => {
	const permissionNames = permissions.map(({ permission }) => permission);
	return `permission:${permissionNames.join(',')}`;
};

/**
 * Returns the role middleware definition for the list of roles.
 *
 * @param {string[]} roles Array of roles.
 *
 * @returns {string}
 */
const getMiddlewareRoles = (roles) => {
	return `role:${roles.join(',')}`;
};

/**
 * Checks whether the matched permission is include in the array of permission.
 *
 * @param {object[]} permissions List of permissions to check against.
 * @param {string} matchedPermission The matched permission.
 *
 * @returns {boolean}
 */
const matchesPermission = (permissions, matchedPermission) => {
	const permissionNames = permissions.map(({ permission }) => permission);

	return permissionNames.includes(matchedPermission);
};

module.exports = {
	getRolePermissions,
	getMiddlewarePermissions,
	getMiddlewareRoles,
	matchesPermission,
	roles: ROLES,
	permissions: PERMISSIONS,
};
