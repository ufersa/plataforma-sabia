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
		description: 'Permite atualizar o status de uma tecnologia',
	},
	UPDATE_TECHNOLOGY_ACTIVE: {
		permission: 'update-technology-active-status',
		description: 'Permite ativar e desativar uma tecnologia',
	},
	DELETE_TECHNOLOGY: {
		permission: 'delete-technology',
		description: 'Permite excluir a própria tecnologia no sistema',
	},
	// technology orders
	LIST_TECHNOLOGIES_ORDERS: {
		permission: 'list-technologies-orders',
		description: 'Permite listar todos os pedidos de tecnologias',
	},
	CLOSE_TECHNOLOGY_ORDER: {
		permission: 'close-technology-order',
		description: 'Permite fechar um pedido de uma technologia',
	},
	CANCEL_TECHNOLOGY_ORDER: {
		permission: 'cancel-technology-order',
		description: 'Permite cancelar um pedido de uma technologia',
	},
	// technology questions
	ANSWER_TECHNOLOGY_QUESTION: {
		permission: 'answer-technology-question',
		description: 'Permite responder a uma pergunta de uma tecnologia',
	},
	DISABLE_TECHNOLOGY_QUESTION: {
		permission: 'disable-technology-question',
		description: 'Permite desabilitar a uma pergunta de uma tecnologia',
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
	// Announcements
	UPDATE_ANNOUNCEMENT: {
		permission: 'update-announcement',
		description: 'Permite editar o edital do próprio usuário no sistema',
	},
	UPDATE_ANNOUNCEMENTS: {
		permission: 'update-announcements',
		description: 'Permite editar os editais de qualquer usuário no sistema',
	},
	DELETE_ANNOUNCEMENT: {
		permission: 'delete-announcement',
		description: 'Permite excluir o edital do próprio usuário no sistema',
	},
	DELETE_ANNOUNCEMENTS: {
		permission: 'delete-announcements',
		description: 'Permite excluir os editais de qualquer usuário no sistema',
	},
	// Ideas
	UPDATE_IDEA: {
		permission: 'update-idea',
		description: 'Permite editar a ideia do próprio usuário no sistema',
	},
	UPDATE_IDEAS: {
		permission: 'update-ideas',
		description: 'Permite editar as ideias de qualquer usuário no sistema',
	},
	DELETE_IDEA: {
		permission: 'delete-idea',
		description: 'Permite excluir a ideia do próprio usuário no sistema',
	},
	DELETE_IDEAS: {
		permission: 'delete-ideas',
		description: 'Permite excluir as ideias de qualquer usuário no sistema',
	},
	// Services
	UPDATE_SERVICE: {
		permission: 'update-service',
		description: 'Permite editar o serviço do próprio usuário no sistema',
	},
	UPDATE_SERVICE_ACTIVE: {
		permission: 'update-service-active-status',
		description: 'Permite ativar e desativar um serviço',
	},
	UPDATE_SERVICES: {
		permission: 'update-services',
		description: 'Permite editar os serviços de qualquer usuário no sistema',
	},
	UPDATE_SERVICES_ACTIVE: {
		permission: 'update-services-active-status',
		description: 'Permite ativar e desativar os serviços de qualquer usuário no sistema',
	},
	DELETE_SERVICE: {
		permission: 'delete-service',
		description: 'Permite excluir o serviço do próprio usuário no sistema',
	},
	DELETE_SERVICES: {
		permission: 'delete-services',
		description: 'Permite excluir os serviços de qualquer usuário no sistema',
	},
	// Service Orders
	LIST_SERVICES_ORDERS: {
		permission: 'list-services-orders',
		description: 'Permite listar todos as ordens de serviço',
	},
	UPDATE_SERVICE_ORDER: {
		permission: 'update-service-order',
		description: 'Permite editar a ordem de serviço do próprio usuário no sistema',
	},
	UPDATE_SERVICE_ORDERS: {
		permission: 'update-service-orders',
		description: 'Permite editar as orderns de serviço de qualquer usuário no sistema',
	},
	PERFORM_SERVICE_ORDER: {
		permission: 'perform-service-order',
		description: 'Permite executar a ordem de serviço do usuário responsável no sistema',
	},
	CLOSE_SERVICE_ORDER: {
		permission: 'close-service-order',
		description: 'Permite fechar um pedido de um serviço',
	},
	CANCEL_SERVICE_ORDER: {
		permission: 'cancel-service-order',
		description: 'Permite cancelar um pedido de um serviço',
	},
	DELETE_SERVICE_ORDER: {
		permission: 'delete-service-order',
		description: 'Permite excluir a orderm de serviço do próprio usuário no sistema',
	},
	DELETE_SERVICE_ORDERS: {
		permission: 'delete-service-orders',
		description: 'Permite excluir as ordens de serviço de qualquer usuário no sistema',
	},
	// Service Order Reviews
	CREATE_SERVICE_ORDER_REVIEW: {
		permission: 'create-service-order-review',
		description:
			'Permite que o usuário que criou a ordem de serviço avalie a prestadora de serviço',
	},
	UPDATE_SERVICE_ORDER_REVIEW: {
		permission: 'update-service-order-review',
		description:
			'Permite que o usuário que criou a ordem de serviço atualize a avaliação da prestadora de serviço',
	},
	DELETE_SERVICE_ORDER_REVIEW: {
		permission: 'delete-service-order-review',
		description:
			'Permite que o usuário que criou a ordem de serviço delete a avaliação da prestadora de serviço',
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
	PERMISSIONS.UPDATE_TECHNOLOGY_ACTIVE,
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
