import TechnologyFormPage, { getTaxonomiesData } from './[id]/edit';

export const getServerSideProps = async () => {
	const taxonomies = await getTaxonomiesData();

	return {
		props: {
			initialValues: { taxonomies },
		},
	};
};

export default TechnologyFormPage;
