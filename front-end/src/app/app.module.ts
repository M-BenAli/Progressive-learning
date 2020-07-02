import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LearningGoalsModule} from './learning-goals/learning-goals.module';
import {TasksModule} from "./tasks/tasks.module";
import {FooterComponent} from './components/footer/footer.component';
import {UserComponent} from './users/user/user.component';
import {UsersModule} from "./users/users.module";
import {httpInterceptors} from "./http-interceptors";
import {PageNotFoundComponent} from './error-pages/page-not-found/page-not-found.component';
import {ForbiddenComponent} from './error-pages/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    FooterComponent,
    UserComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LearningGoalsModule,
    TasksModule,
    UsersModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptors],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
