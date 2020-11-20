const BaseValidator = use('App/Validators/BaseValidator');
class CloseOrder extends BaseValidator {
	get rules() {
		return {
			quantity: 'required|number',
			unit_value: 'required|number',
		};
	}
}

module.exports = CloseOrder;
