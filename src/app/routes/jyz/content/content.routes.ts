import {ContentComponent} from './content.component';

import {DashboardComponent} from '../dashboard/dashboard.component';


export const contentRoutes = [{
	path: '',
	component: ContentComponent,
	children: [

        { path: '', redirectTo: 'contract_for_purchase', pathMatch: 'full' },
		{ path: 'contract_for_purchase', loadChildren: '../contract_for_purchase/contract_for_purchase.module#ContractForPurchaseModule' },
		{ path: 'oil_depot', loadChildren: '../oil_depot/oil_depot.module#OilDepotModule' },
		{ path: 'oil_transfer', loadChildren: '../oil_transfer/oil_transfer.module#OilTransferModule' },
		{ path: 'dispatch_for_purchase', loadChildren: '../dispatch_for_purchase/dispatch_for_purchase.module#DispatchForPurchaseModule' },
		{ path: 'metering_for_return', loadChildren: '../metering_for_return/metering_for_return.module#MeteringForReturnModule' },     
        { path: 'dashboard', component: DashboardComponent},
	]
}];