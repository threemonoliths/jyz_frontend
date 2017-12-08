import {CarryForAccountComponent} from './carry_for_account.component';
import {CarryForAccountListComponent} from './list/list.component';
import {CarryForAccountFormComponent} from './form/form.component';

export const contractForPurchaseRoutes = [{
	path: '',
	component: CarryForAccountComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: CarryForAccountListComponent },
		{ path: 'form', component: CarryForAccountFormComponent },
	]
}];