import {UserManagementComponent} from './user_management.component';
import {UserManagementListComponent} from './list/list.component';
import {UserManagementFormComponent} from './form/form.component';
export const userManagementRoutes = [{
	path: '',
	component: UserManagementComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: UserManagementListComponent },
		{ path: 'form', component: UserManagementFormComponent },
	]
}];