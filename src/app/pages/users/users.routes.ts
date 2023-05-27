import { Routes } from "@angular/router";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    title: 'User list'
  },
  {
    path: 'add',
    component: UserAddComponent,
    title: 'Add new user'
  },
  {
    path: 'edit',
    component: UserEditComponent,
    title: 'Edit user'
  }
]