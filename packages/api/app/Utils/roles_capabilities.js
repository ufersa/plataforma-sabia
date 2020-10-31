const ROLES = {
	DEFAULT_USER: 'DEFAULT_USER',
	RESEARCHER: 'RESEARCHER',
	INVESTOR: 'INVESTOR',
	REVIEWER: 'REVIEWER',
	ADMIN: 'ADMIN',
	OWNER: 'OWNER',
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
	LIST_TECHNOLOGY_COMMENTS: {
		permission: 'list-technology-comments',
		description: 'Permite listar os comentários de uma tecnologia',
	},
	LIST_TECHNOLOGIES_COMMENTS: {
		permission: 'list-technologies-comments',
		description: 'Permite listar os comentários de qualquer tecnologia',
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
	UPDATE_TECHNOLOGY_STATUS: {
		permission: 'update-technology-status',
		description: 'Permite o status de uma tecnologia',
	},
	DELETE_TECHNOLOGY: {
		permission: 'delete-technology',
		description: 'Permite excluir a própria tecnologia no sistema',
	},
	// technology reviews
	CREATE_TECHNOLOGY_REVIEWS: {
		permission: 'create-technology-reviews',
		description: 'Permite criar revisões de tecnologias no sistema',
	},
	UPDATE_TECHNOLOGY_REVIEWS: {
		permission: 'update-technology-reviews',
		description: 'Permite editar revisões de tecnologias no sistema',
	},
	UPDATE_TECHNOLOGY_REVIEW: {
		permission: 'update-technology-review',
		description: 'Permite editar a própria revisão de tecnologia no sistema',
	},
	DELETE_TECHNOLOGY_REVIEWS: {
		permission: 'delete-technology-reviews',
		description: 'Permite excluir revisões de tecnologias no sistema',
	},
	CREATE_TECHNOLOGY_REVISION: {
		permission: 'create-technology-revision',
		description: 'Permite fazer a revisão de uma tecnologia (curadoria)',
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
	// Bookmarks
	LIST_BOOKMARK: {
		permission: 'list-bookmark',
		description: 'Permite listar os favoritos do usuário logado',
	},
	LIST_BOOKMARKS: {
		permission: 'list-bookmarks',
		description: 'Permite listar os favoritos de qualquer usuário',
	},
	DELETE_BOOKMARK: {
		permission: 'delete-bookmark',
		description: 'Permite excluir os favoritos do próprio usuário no sistema',
	},
	DELETE_BOOKMARKS: {
		permission: 'delete-bookmarks',
		description: 'Permite excluir os favoritos de qualquer usuário no sistema',
	},
	// Uploads
	CREATE_UPLOADS: {
		permission: 'create-uploads',
		description: 'Permite realizar uploads',
	},
	DELETE_UPLOAD: {
		permission: 'delete-upload',
		description: 'Permite excluir os uploads do próprio usuário no sistema',
	},
	DELETE_UPLOADS: {
		permission: 'delete-uploads',
		description: 'Permite excluir os uploads de qualquer usuário no sistema',
	},
	// Institutions
	UPDATE_INSTITUTION: {
		permission: 'update-institution',
		description: 'Permite editar a instituição do próprio usuário no sistema',
	},
	UPDATE_INSTITUTIONS: {
		permission: 'update-institutions',
		description: 'Permite editar as instituições de qualquer usuário no sistema',
	},
	DELETE_INSTITUTION: {
		permission: 'delete-institution',
		description: 'Permite excluir a instituição do próprio usuário no sistema',
	},
	DELETE_INSTITUTIONS: {
		permission: 'delete-institutions',
		description: 'Permite excluir as instituições de qualquer usuário no sistema',
	},
};

const DEFAULT_USER = [
	// users
	PERMISSIONS.UPDATE_USER,
	PERMISSIONS.VIEW_USER,
	PERMISSIONS.DELETE_USER,
	PERMISSIONS.LIST_BOOKMARK,
	PERMISSIONS.DELETE_BOOKMARK,
	PERMISSIONS.LIST_TECHNOLOGY_COMMENTS,
];
const RESEARCHER = [
	...DEFAULT_USER,
	PERMISSIONS.CREATE_TECHNOLOGIES,
	PERMISSIONS.UPDATE_TECHNOLOGY,
	PERMISSIONS.ASSOCIATE_TECHNOLOGY_USERS,
	PERMISSIONS.DELETE_TECHNOLOGY_USERS,
];

const REVIEWER = [
	...DEFAULT_USER,
	PERMISSIONS.UPDATE_TECHNOLOGY_STATUS,
	PERMISSIONS.CREATE_TECHNOLOGY_REVISION,
];

const ROLES_PERMISSIONS = {
	[ROLES.DEFAULT_USER]: DEFAULT_USER,
	[ROLES.RESEARCHER]: RESEARCHER,
	[ROLES.REVIEWER]: REVIEWER,
	// INVESTOR: [],
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
