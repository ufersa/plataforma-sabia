import { FUNDING as orderFundingEnum, USE as orderUseEnum } from './enums/orders.enum';

/**
 * Returns order funding label based on key
 *
 * @param {string} value The funding key
 * @returns {string} The funding label text
 */
export const getFundingLabelText = (value) =>
	({
		[orderFundingEnum.HAS_FUNDING]: 'Sim, eu já tenho como financiar',
		[orderFundingEnum.WANTS_FUNDING]: 'Sim, mas não tenho como financiar',
		[orderFundingEnum.NO_NEED_FUNDING]: 'Não preciso de financiamento',
	}[value]);

/**
 * Returns order use label based on key
 *
 * @param {string} value The use key
 * @returns {string} The use label text
 */
export const getUseLabelText = (value) =>
	({
		[orderUseEnum.PRIVATE]: 'Privado',
		[orderUseEnum.ENTERPRISE]: 'Empresa',
		[orderUseEnum.LOCAL_GOVERNMENT]: 'Municipal',
		[orderUseEnum.PROVINCIAL_GOVERNMENT]: 'Estadual',
		[orderUseEnum.FEDERAL_GOVERNMENT]: 'Federal',
		[orderUseEnum.OTHER]: 'Outro',
	}[value]);
