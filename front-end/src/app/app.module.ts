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
import {UnitsModule} from "./units/units.module";
import {FooterComponent} from './components/footer/footer.component';
import {UserComponent} from './users/user/user.component';
import {UsersModule} from "./users/users.module";
import {httpInterceptors} from "./http-interceptors";
import {PageNotFoundComponent} from './error-pages/page-not-found/page-not-found.component';
import {ForbiddenComponent} from './error-pages/forbidden/forbidden.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SubjectsModule} from "./subjects/subjects.module";
import {SignUpComponent} from './components/sign-up/sign-up.component';

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
    DashboardComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LearningGoalsModule,
    UnitsModule,
    UsersModule,
    SubjectsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptors],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
