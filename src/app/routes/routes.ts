import { LayoutComponent } from '../layout/layout.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LoginComponent } from './pages/login/login.component';
import { StepFormComponent } from './pages/register/step-form.component';
import { Page404Component } from './pages/404/404.component';
import { Page500Component } from './pages/500/500.component';

// pro
// import { ProUserLayoutComponent } from '../layout/pro/user/user.component';


import { AuthGuard } from './auth.guard';

export const routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
		path: 'login',
		component: LoginComponent
    },    
    

    {
        path: 'layout',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'content', pathMatch: 'full' },
            // 加油站项目路由
            { path: 'content', loadChildren: './jyz/content/content.module#ContentModule' },
        ],
        canActivate: [AuthGuard]
    },
    // 全屏布局
    // {
    //     path: 'data-v',
    //     component: LayoutFullScreenComponent,
    //     children: [
    //         { path: '', loadChildren: './data-v/data-v.module#DataVModule' }
    //     ]
    // },
    // pro 单页，存在此原因是体验更好，这样不必在首次Angular运行后还需要下载模块文件才会渲染成功
    // {
    //     path: 'pro/user',
    //     component: ProUserLayoutComponent,
    //     children: [
    //         { path: 'login', component: ProUserLoginComponent },
           
    //     ]
    // },
    // 单页不包裹Layout
    { path: 'register', component: StepFormComponent, data: { translate: 'register' } },
    { path: 'login', component: LoginComponent, data: { title: 'login' } },
    { path: '404', component: Page404Component },
    { path: '500', component: Page500Component },
    { path: '**', redirectTo: 'dashboard' },

    {
		path: '**', // fallback router must in the last
		component: LoginComponent
	},
];
