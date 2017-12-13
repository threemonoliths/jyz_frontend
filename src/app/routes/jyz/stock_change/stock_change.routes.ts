import {StockChangeComponent} from './stock_change.component';
import {StockChangeListComponent} from './list/list.component';
import {StockChangeFormComponent} from './form/form.component';

export const stockChangeRoutes = [{
	path: '',
	component: StockChangeComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: StockChangeListComponent },
		{ path: 'form', component: StockChangeFormComponent },
	]
}];