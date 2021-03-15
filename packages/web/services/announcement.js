/* eslint-disable import/prefer-default-export */
import { apiPost } from './api';

/**
 * Creates an annonucement.
 *
 * @param {object} announcementData The announcement data
 * @returns {object} The newly created announcement
 */
export const createAnnouncement = async (announcementData) => {
	const { data, status } = await apiPost(`announcements`, { ...announcementData });

	return status !== 200 ? { data: data?.error, success: false } : { data, success: true };
};
