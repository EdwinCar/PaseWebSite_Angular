import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/admin/login/login.component';
import { BaseLoginComponent } from './views/admin/base-login/base-login.component';
import { BasePageComponent } from './views/admin/base-page/base-page.component';

import { AuthService } from './services/users/auth.service';
import { AppConfigService } from './app.config';
import { HeaderComponent } from './views/admin/component/header/header.component';
import { FooterComponent } from './views/admin/component/footer/footer.component';
import { SidebarComponent } from './views/admin/component/sidebar/sidebar.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { JwtInterceptor } from './services/jwt/jwt.interceptor';
import { BreadcrumbComponent } from './views/admin/component/breadcrumb/breadcrumb.component';

const initConfig = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseLoginComponent,
    BasePageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
