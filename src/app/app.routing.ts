import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocksComponent } from './views/home/stocks/stocks.component';
import { StockDetailsComponent } from './views/home/stock-details/stock-details.component';
import { LoginComponent } from './views/login/login.component';

const appRoutes: Routes = [
                           {
                             path: '',
                             component: StocksComponent
                           },
                           {
                             path: 'stock-details/:symbol',
                             component: StockDetailsComponent
                           },
                           {
                            path: 'login',
                            component: LoginComponent
                           }
                          ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);