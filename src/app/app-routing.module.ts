import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBusinessComponent } from './pages/my-business/my-business.component';


const routes: Routes = [
  { path: '', component: MyBusinessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } //404
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
