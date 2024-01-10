import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { LibraryComponent } from './library/library.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
    { path: '', component: LibraryComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
