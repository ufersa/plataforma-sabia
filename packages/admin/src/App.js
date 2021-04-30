import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import i18nProvider from './providers/i18nProvider';

import { LoginPage } from './components/Auth';
import Layout from './components/Layout';
import routes from './routes';

import { TechnologiesList, TechnologiesCreate, TechnologiesEdit } from './pages/technologies';
import { TermsList, TermsCreate, TermsEdit } from './pages/terms';
import { TaxonomyList, TaxonomyCreate, TaxonomyEdit } from './pages/taxonomy';
import { UsersList, UsersCreate, UsersEdit } from './pages/users';
import { RolesList, RolesCreate, RolesEdit } from './pages/roles';
import { PermissionsList, PermissionsCreate, PermissionsEdit } from './pages/permissions';
import { ReviewersList, ReviewersCreate, ReviewersEdit } from './pages/reviewers';
import { TechnologyOrdersList, TechnologyOrdersEdit } from './pages/technologyOrder';
import { InstitutionsList, InstitutionsCreate, InstitutionsEdit } from './pages/institutions';
import { IdeasList, IdeasCreate, IdeasEdit } from './pages/ideas';
import { AnnouncementsList, AnnouncementsCreate, AnnouncementsEdit } from './pages/announcements';

import * as Icons from './utils/icons';

const App = () => {
	const translate = useTranslate();

	return (
		<Admin
			loginPage={LoginPage}
			authProvider={authProvider}
			dataProvider={dataProvider}
			i18nProvider={i18nProvider}
			layout={Layout}
			customRoutes={routes}
		>
			<Resource
				name="solutions"
				icon={Icons.solutions}
				options={{label: translate(`menu.solutions`), isMenuParent: true}}
			/>
			<Resource
				name="technologies"
				list={TechnologiesList}
				create={TechnologiesCreate}
				edit={TechnologiesEdit}
				icon={Icons.technologies}
				options={{label: translate(`resources.technologies.name`), menuParent: "solutions" }}
			/>
			<Resource
				name="ideas"
				list={IdeasList}
				create={IdeasCreate}
				edit={IdeasEdit}
				icon={Icons.ideas}
				options={{label: translate(`resources.ideas.name`), menuParent: "solutions" }} />
			<Resource
				name="announcements"
				list={AnnouncementsList}
				create={AnnouncementsCreate}
				edit={AnnouncementsEdit}
				icon={Icons.announcements}
				options={{label: translate(`resources.announcements.name`), menuParent: "solutions" }}
			/>
			<Resource
				name="orders"
				list={TechnologyOrdersList}
				create={false}
				edit={TechnologyOrdersEdit}
				icon={Icons.orders}
				options={{label: translate(`resources.orders.name`) }}
			/>
			<Resource
				name="usersSection"
				icon={Icons.usersSection}
				options={{label: translate(`menu.usersSection`), isMenuParent: true}}
			/>
			<Resource
				name="users"
				list={UsersList}
				create={UsersCreate}
				edit={UsersEdit}
				icon={Icons.users}
				options={{label: translate(`resources.users.name`), menuParent: "usersSection"}}

			/>
			<Resource
				name="permissions"
				list={PermissionsList}
				create={PermissionsCreate}
				edit={PermissionsEdit}
				icon={Icons.permissions}
				options={{label: translate(`resources.permissions.name`), menuParent: "usersSection" }}
			/>
			<Resource
				name="roles"
				list={RolesList}
				create={RolesCreate}
				edit={RolesEdit}
				icon={Icons.roles}
				options={{label: translate(`resources.roles.name`), menuParent: "usersSection" }}
			/>
			<Resource
				name="reviewers"
				list={ReviewersList}
				create={ReviewersCreate}
				edit={ReviewersEdit}
				icon={Icons.reviewers}
				options={{label: translate(`resources.reviewers.name`), menuParent: "usersSection" }}
			/>
			<Resource
				name="config"
				icon={Icons.announcements}
				options={{label: translate(`menu.config`), isMenuParent: true, "isOpen": true}}
			/>
			<Resource
				name="taxonomies"
				list={TaxonomyList}
				create={TaxonomyCreate}
				edit={TaxonomyEdit}
				icon={Icons.taxonomies}
				options={{label: translate(`resources.taxonomies.name`), menuParent: "config" }}
			/>
			<Resource
				name="terms"
				list={TermsList}
				create={TermsCreate}
				edit={TermsEdit}
				icon={Icons.terms}
				options={{label: translate(`resources.terms.name`), menuParent: "config" }}
			/>

			<Resource
				name="institutions"
				list={InstitutionsList}
				create={InstitutionsCreate}
				edit={InstitutionsEdit}
				icon={Icons.institutions}
				options={{label: translate(`resources.institutions.name`), menuParent: "config" }}
			/>
		</Admin>
	);
};
export default App;
