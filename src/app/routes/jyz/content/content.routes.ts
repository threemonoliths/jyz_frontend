import {ContentComponent} from './content.component';

import {DashboardComponent} from '../dashboard/dashboard.component';


export const contentRoutes = [{
	path: '',
	component: ContentComponent,
	children: [
        { path: '', redirectTo: 'contract_for_purchase', pathMatch: 'full' },
		{ path: 'contract_for_purchase', loadChildren: '../contract_for_purchase/contract_for_purchase.module#ContractForPurchaseModule' },
		{ path: 'godownentry_for_acceptance', loadChildren: '../godownentry_for_acceptance/godownentry_for_acceptance.module#GodownentryForAcceptanceModule' },
		{ path: 'carry_for_account', loadChildren: '../carry_for_account/carry_for_account.module#CarryForAccountModule' },
		{ path: 'dashboard', component: DashboardComponent},
	]
}];