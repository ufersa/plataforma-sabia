import React from 'react';
import PropTypes from 'prop-types';
import { TabbedShowLayout, Tab, Error, Loading, useQuery } from 'react-admin';
import Technologies from './Technologies';
import Reviews from './Reviews';
import AboutForm from './AboutForm';
import Bookmarks from './Bookmarks';
import Institution from './Institution';

const UsersForm = ({ record, resource, save }) => {
	const { loading, error, data: newRecord } = useQuery({
		type: 'getOne',
		resource: `users`,
		payload: {
			id: record.id,
			query: { embed: '' },
		},
	});

	if (!record.id) return <AboutForm save={save} />;

	if (error) return <Error />;
	if (loading) return <Loading />;

	return (
		<TabbedShowLayout record={newRecord} resource={resource}>
			<Tab label="About" path="">
				<AboutForm save={save} />
			</Tab>
			<Tab label="Technologies" path="technologies">
				<Technologies />
			</Tab>
			<Tab label="Reviews" path="reviews">
				<Reviews />
			</Tab>
			<Tab label="Bookmarks" path="bookmarks">
				<Bookmarks />
			</Tab>
			<Tab label="Institution" path="institution">
				<Institution />
			</Tab>
		</TabbedShowLayout>
	);
};

UsersForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

UsersForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default UsersForm;
