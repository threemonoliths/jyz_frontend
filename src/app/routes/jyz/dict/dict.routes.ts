import {DictComponent} from './dict.component';
import {DictListComponent} from './list/list.component';
import {DictFormComponent} from './form/form.component';

export const dictRoutes = [{
	path: '',
	component: DictComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: DictListComponent },
		{ path: 'form', component: DictFormComponent },
	]
}];