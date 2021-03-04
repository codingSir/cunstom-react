import React from 'react'

import App from '@src/entry/App';
import BaseLayout from '@src/layouts/BaseLayout/BaseLayout'

export interface RouteConfigDeclaration {

    /**
     * 当前路由路径
     */
    path: string;
    /**
     * 当前路由名称
     */
    name?: string;
    /**
     * 是否严格匹配路由
     */
    exact?: boolean;
    /**
     * 是否需要路由鉴权
     */
    isProtected?: boolean;
    /**
     * 是否需要路由重定向
     */
    isRedirect?: boolean;
    /**
     * 是否需要动态加载路由
     */
    isDynamic?: boolean;
    /**
     * 动态加载路由时的提示文案
     */
    loadingFallback?: string;
    /**
     * 路由组件
     */
    component: any;
    /**
     * 子路由
     */
    routes?: RouteConfigDeclaration[];

}

export const routerConfig: RouteConfigDeclaration[] = [
    {
        path:'/',
        name:'root',
        component:App,
        routes:[
            {
                path:'/login',
                name:'login',
                isRedirect:true,
                exact:false,
                isDynamic:true,
                component:React.lazy(()=> import('@src/views/Login'))
            },
            {
                path:'/home',
                name:'home',
                exact:false,
                isDynamic:true,
                component:React.lazy(()=> import('@src/views/Home')),
            },
            {
                path:'/application',
                name:'application',
                exact:false,
                component: BaseLayout,
                routes:[
                    {
                        path:'/application/create',
                        name:'applicationCreate',
                        isDynamic:true,
                        exact:true,
                        component:React.lazy(()=> import('@src/views/ApplicationCreate'))
                    }
                ]
            },
            {
                path:'/pcEditor',
                name:'pcEditor',
                isDynamic:true,
                exact:false,
                component:React.lazy(() => import('@src/views/PcEditor'))
            }
        ]
    }
];
