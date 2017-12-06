import {ContentComponent} from './content.component';

import {DashboardComponent} from '../dashboard/dashboard.component';


export const contentRoutes = [{
	path: '',
	component: ContentComponent,
	children: [

        { path: '', redirectTo: 'contract_for_purchase', pathMatch: 'full' },
		{ path: 'contract_for_purchase', loadChildren: '../contract_for_purchase/contract_for_purchase.module#ContractForPurchaseModule' },
		{ path: 'dispatch_for_purchase', loadChildren: '../dispatch_for_purchase/dispatch_for_purchase.module#DispatchForPurchaseModule' },
		{ path: 'metering_for_return', loadChildren: '../metering_for_return/metering_for_return.module#MeteringForReturnModule' },     
        { path: 'dashboard', component: DashboardComponent},
	]
}];