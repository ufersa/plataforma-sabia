/* eslint-disable import/prefer-default-export */
import { apiPut } from './api';
import { STATUS as messageStatusEnum } from '../utils/enums/messages.enum';
/**
 * Toggle message read status
 *
 * @param {string|number} messageId The message ID
 * @param {string} messageStatus The message status
 */
export const toggleReadStatus = async (messageId, messageStatus) => {
	const endpoint =
		messageStatus === messageStatusEnum.NEW ? 'messages/mark-as-read' : 'messages/mark-as-new';

	const response = await apiPut(endpoint, { messages: [messageId] });

	if (response.status !== 200) return false;

	return true;
};
