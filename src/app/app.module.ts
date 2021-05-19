// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
// import { httpInterceptorProviders } from './interceptors/index'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    LoginNavComponent,
    DashboardComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // AppMaterialModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public spinkit = Spinkit;
}
