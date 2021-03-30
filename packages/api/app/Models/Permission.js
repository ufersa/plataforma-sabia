/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');
const Technology = use('App/Models/Technology');
const TechnologyReview = use('App/Models/TechnologyReview');
const Upload = use('App/Models/Upload');
const Reviewer = use('App/Models/Reviewer');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const Institution = use('App/Models/Institution');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');
const Announcement = use('App/Models/Announcement');
const Idea = use('App/Models/Idea');
const Service = use('App/Models/Service');
const ServiceOrder = use('App/Models/ServiceOrder');
const ServiceOrderReview = use('App/Models/ServiceOrderReview');

const CE = require('@adonisjs/lucid/src/Exceptions');
const GE = require('@adonisjs/generic-exceptions');
const { permissions, matchesPermission, ordersTypes } = require('../Utils');

class Permission extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	static async create(payload) {
		let modelInstance;
		const permission = await this.findBy('permission', payload.permission);
		if (!permission) {
			modelInstance = new Permission();
			modelInstance.fill(payload);
			await modelInstance.save();
		}

		return modelInstance;
	}

	static async createMany(payloadArray) {
		if (!Array.isArray(payloadArray)) {
			throw GE.InvalidArgumentException.invalidParameter(
				`${this.name}.createMany expects an array of values`,
				payloadArray,
			);
		}

		const rows = [];
		for (const payload of payloadArray) {
			// eslint-disable-next-line no-await-in-loop
			const row = await this.create(payload);
			if (row) {
				rows.push(row);
			}
		}
		return rows;
	}

	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	/**
	 * Gets a permission by its id or slug
	 *
	 * @param {string|number} permission Permission id or slug.
	 * @returns {Permission}
	 */
	static async getPermission(permission) {
		if (Number.isInteger(Number(permission))) {
			return this.findOrFail(permission);
		}

		const permissionInst = await this.query()
			.where({ permission })
			.first();

		if (!permissionInst) {
			throw CE.ModelNotFoundException.raise('Permission');
		}

		return permissionInst;
	}

	static async checkIndividualPermission(user, matchedPermission, params, reqParams) {
		const { id, idUser, idTechnology, technology } = params;
		const userResourceId = id || idUser;
		const techonologyResourceId = id || idTechnology || technology;
		const { orderType } = reqParams;

		/** Individual User Permissions */
		if (
			matchesPermission(
				[
					permissions.VIEW_USER,
					permissions.UPDATE_USER,
					permissions.DELETE_USER,
					permissions.LIST_BOOKMARK,
					permissions.DELETE_BOOKMARK,
				],
				matchedPermission,
			)
		) {
			if (user.id.toString() !== userResourceId) {
				return false;
			}
		}

		/** Individual Technology Permissions */
		if (
			matchesPermission(
				[permissions.UPDATE_TECHNOLOGY, permissions.DELETE_TECHNOLOGY],
				matchedPermission,
			)
		) {
			const technologyInst = await Technology.findOrFail(techonologyResourceId);
			const isResponsible = await technologyInst.checkResponsible(user);
			if (!isResponsible) {
				return false;
			}
		}

		if (matchesPermission([permissions.UPDATE_TECHNOLOGY_ACTIVE], matchedPermission)) {
			const technologyInst = await Technology.findOrFail(techonologyResourceId);
			const isOwner = await technologyInst.getOwner();
			if (!isOwner) {
				return false;
			}
		}

		if (matchesPermission([permissions.LIST_TECHNOLOGY_COMMENTS], matchedPermission)) {
			const technologyInst = await Technology.findOrFail(techonologyResourceId);
			const isResponsible = await technologyInst.checkResponsible(user);
			if (isResponsible) return true;
			const isReviewer = await Reviewer.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technologyInst.id);
				})
				.where({
					user_id: user.id,
				})
				.first();
			return !!isReviewer;
		}

		/** Individual Technology Review Permissions */
		if (matchesPermission([permissions.UPDATE_TECHNOLOGY_REVIEW], matchedPermission)) {
			const technologyReview = await TechnologyReview.findOrFail(id);
			if (technologyReview.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Uploads Permissions */
		if (matchesPermission([permissions.DELETE_UPLOAD], matchedPermission)) {
			const upload = await Upload.findOrFail(id);
			if (upload.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Reviewer Permissions */
		if (matchesPermission([permissions.CREATE_TECHNOLOGY_REVISION], matchedPermission)) {
			const technologyReviewed = await Technology.getTechnology(technology);
			const reviewer = await Reviewer.getReviewer(user);
			return reviewer.isReviewer(technologyReviewed);
		}

		/** Individual TechnologyOrder Permissions */
		if (
			matchesPermission([permissions.CLOSE_TECHNOLOGY_ORDER], matchedPermission) &&
			orderType === ordersTypes.TECHNOLOGY
		) {
			const order = await TechnologyOrder.findOrFail(id);
			const technologyPurchased = await Technology.findOrFail(order.technology_id);
			const owner = await technologyPurchased.getOwner();
			if (owner.id !== user.id) return false;
		}

		if (
			matchesPermission([permissions.CLOSE_SERVICE_ORDER], matchedPermission) &&
			orderType === ordersTypes.SERVICE
		) {
			const order = await ServiceOrder.findOrFail(id);
			const service = await Service.findOrFail(order.service_id);
			if (service.user_id !== user.id) return false;
		}

		if (matchesPermission([permissions.CANCEL_TECHNOLOGY_ORDER], matchedPermission)) {
			const order = await TechnologyOrder.findOrFail(id);
			const technologyPurchased = await Technology.findOrFail(order.technology_id);
			const owner = await technologyPurchased.getOwner();
			if (owner.id === user.id) return true;
			return order.user_id === user.id;
		}

		/** Individual TechnologyQuestion Permissions */
		if (
			matchesPermission(
				[permissions.ANSWER_TECHNOLOGY_QUESTION, permissions.DISABLE_TECHNOLOGY_QUESTION],
				matchedPermission,
			)
		) {
			const question = await TechnologyQuestion.findOrFail(id);
			const technologyInst = await Technology.findOrFail(question.technology_id);
			const owner = await technologyInst.getOwner();
			if (owner.id !== user.id) return false;
		}

		/** Individual Institution Permissions */
		if (
			matchesPermission(
				[permissions.UPDATE_INSTITUTION, permissions.DELETE_INSTITUTION],
				matchedPermission,
			)
		) {
			const institution = await Institution.findOrFail(id);
			const institutionJson = institution.toJSON();
			if (institutionJson.responsible !== user.id) return false;
		}

		/** Individual Idea Permissions */
		if (
			matchesPermission([permissions.UPDATE_IDEA, permissions.DELETE_IDEA], matchedPermission)
		) {
			const idea = await Idea.findOrFail(id);
			if (idea.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Announcement Permissions */
		if (
			matchesPermission(
				[permissions.UPDATE_ANNOUNCEMENT, permissions.DELETE_ANNOUNCEMENT],
				matchedPermission,
			)
		) {
			const announcement = await Announcement.findOrFail(id);
			if (announcement.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Service Permissions */
		if (
			matchesPermission(
				[
					permissions.UPDATE_SERVICE,
					permissions.UPDATE_SERVICE_ACTIVE,
					permissions.DELETE_SERVICE,
				],
				matchedPermission,
			)
		) {
			const service = await Service.findOrFail(id);
			if (service.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Service Order Permissions */
		if (
			matchesPermission(
				[permissions.UPDATE_SERVICE_ORDER, permissions.DELETE_SERVICE_ORDER],
				matchedPermission,
			)
		) {
			const serviceOrder = await ServiceOrder.findOrFail(id);
			if (serviceOrder.user_id !== user.id) {
				return false;
			}
		}

		if (matchesPermission([permissions.PERFORM_SERVICE_ORDER], matchedPermission)) {
			const serviceOrder = await ServiceOrder.findOrFail(id);
			const service = await Service.findOrFail(serviceOrder.service_id);
			if (service.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Service Order Review Permissions */
		if (matchesPermission([permissions.CREATE_SERVICE_ORDER_REVIEW], matchedPermission)) {
			const serviceOrder = await ServiceOrder.findOrFail(id);
			if (serviceOrder.user_id !== user.id) {
				return false;
			}
		}
		if (
			matchesPermission(
				[permissions.UPDATE_SERVICE_ORDER_REVIEW, permissions.DELETE_SERVICE_ORDER_REVIEW],
				matchedPermission,
			)
		) {
			const serviceOrderReview = await ServiceOrderReview.findOrFail(id);
			if (serviceOrderReview.user_id !== user.id) {
				return false;
			}
		}

		return true;
	}

	static async checkPermission(user, permissionsList, params = {}, reqParams = {}) {
		// Get All Permission related to user
		const userRole = await Role.find(user.role_id);
		const [userRolePermissions, userDirectPermissions] = await Promise.all([
			userRole.permissions().fetch(),
			user.permissions().fetch(),
		]);
		const userPermissions = [...userRolePermissions.rows, ...userDirectPermissions.rows];
		const userPermissionsArr = userPermissions.map((up) => up.permission);
		const matchedPermissions = permissionsList.filter((p) => userPermissionsArr.includes(p));
		if (matchedPermissions && matchedPermissions.length) {
			return this.checkIndividualPermission(user, matchedPermissions[0], params, reqParams);
		}
		return false;
	}
}

module.exports = Permission;
