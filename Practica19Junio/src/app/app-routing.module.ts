import {ExtraOptions, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {CreateAddressComponent} from "./components/create-address/create-address.component";


const routes: Routes = [
  {
    path:'list-users',
    component: ListUsersComponent
  },
  {
    path:'create-user',
    component: CreateUserComponent
  },
  {
    path:'create-address',
    component: CreateAddressComponent
  },
  {
    path:'create-address/:id',
    component: CreateAddressComponent
  },
  {
    path :'update-user/:id',
    component: CreateUserComponent
  },
  {
    path:'',
    redirectTo: 'list-users',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: 'list-users',
    pathMatch: 'full'
  }
];

const config : ExtraOptions = {
  useHash : true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  declarations:[]
})

export class AppRoutingModule{

}


