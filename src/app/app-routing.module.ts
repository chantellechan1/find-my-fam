import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PersonDetailsComponent } from './person-details/person-details.component';


const routes: Routes = [
  {path: '', component: MapComponent, children: [
    {path: 'person/:id', component: PersonDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
