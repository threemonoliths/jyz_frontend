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
		{ path: 'oil_depot', loadChildren: '../oil_depot/oil_depot.module#OilDepotModule' },
		{ path: 'dispatch_for_purchase', loadChildren: '../dispatch_for_purchase/dispatch_for_purchase.module#DispatchForPurchaseModule' },
		{ path: 'metering_for_return', loadChildren: '../metering_for_return/metering_for_return.module#MeteringForReturnModule' },     
        { path: 'dashboard', component: DashboardComponent},

	]
}];