import {ContentComponent} from './content.component';

import {DashboardComponent} from '../dashboard/dashboard.component';


export const contentRoutes = [{
	path: '',
	component: ContentComponent,
	children: [
        { path: '', redirectTo: 'contract_for_purchase', pathMatch: 'full' },
		{ path: 'contract_for_purchase', loadChildren: '../contract_for_purchase/contract_for_purchase.module#ContractForPurchaseModule' },
		{ path: 'oil_depot', loadChildren: '../oil_depot/oil_depot.module#OilDepotModule' },
		{ path: 'dashboard', component: DashboardComponent},
	]
}];