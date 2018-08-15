import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SettingsComponent } from './dashboard/settings/settings.component';

const appRoutes: Routes = [
  { path: 'tracker', pathMatch: 'full', component: DashboardComponent },
  { path: 'tracker/search', component: SearchComponent },
  { path: 'tracker/settings', component: SettingsComponent },
  { path: 'tracker/accounts', loadChildren: './account/account.module#AccountModule' },
  { path: 'tracker/blocks', loadChildren: './block/block.module#BlockModule' },
  { path: 'tracker/actions', loadChildren: './contract/contract.module#ContractModule' },
  { path: 'tracker/producers', loadChildren: './producer/producer.module#ProducerModule' },
  { path: 'tracker/transactions', loadChildren: './transaction/transaction.module#TransactionModule' },
  { path: 'tracker/support', loadChildren: './support/support.module#SupportModule' }
];

@NgModule({
  imports: [
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
