import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StocksComponent } from './views/home/stocks/stocks.component';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapsibleBoxComponent } from './components/collapsible-box/collapsible-box.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { StockDetailsComponent } from './views/home/stock-details/stock-details.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LoginComponent } from './views/login/login.component';
import { AgGridModule } from 'ag-grid-angular';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OverviewComponent } from './views/home/stock-details/overview/overview.component';
import { CardComponent } from './components/card/card.component';
import { MmmComponent } from './views/home/stock-details/mmm/mmm.component';
import { RatiosByFiscalPeriodComponent } from './views/home/stock-details/ratios-by-fiscal-period/ratios-by-fiscal-period.component';
import { RatiosByCategoryComponent } from './views/home/stock-details/ratios-by-category/ratios-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StocksComponent,
    SearchComponent,
    CollapsibleBoxComponent,
    CheckboxComponent,
    AccordionComponent,
    AccordionItemComponent,
    StockDetailsComponent,
    SideMenuComponent,
    LoginComponent,
    DataGridComponent,
    LoadingComponent,
    OverviewComponent,
    CardComponent,
    MmmComponent,
    RatiosByFiscalPeriodComponent,
    RatiosByCategoryComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    routing,
    AgGridModule.withComponents([])
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
