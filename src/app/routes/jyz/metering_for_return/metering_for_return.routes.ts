import { MeteringForReturnComponent } from './metering_for_return.component';
import { MeteringForReturnFormComponent } from './form/form.component';
import { MeteringForReturnListComponent } from './list/list.component';

export const meteringForReturnComponentRoutes = [{
	path: '',
	component: MeteringForReturnComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: MeteringForReturnListComponent },
		{ path: 'form', component: MeteringForReturnFormComponent },
	]
}];