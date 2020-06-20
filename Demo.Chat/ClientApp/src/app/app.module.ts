import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes  } from '@angular/router';
import {ChatModule } from './components/chat/chat.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { RandomGuard } from './auth/guards/random.guard';
import { RegisterComponent } from './auth/containers/register/register.component';
import {SignalRService } from './services/signal-r.service'
import { TokenInterceptor } from './auth/token.interceptor';
import { EncrDecrService } from  './services/encr-decr.service';
import { FriendsComponent } from './components/friends/friends.component';
import { MyrequestsComponent } from './components/friends/myrequests/myrequests.component';
import { RequestmeComponent } from './components/friends/requestme/requestme.component';
import { ActiveComponent } from './components/friends/active/active.component';
import { MatIconModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from '../app/material-module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FriendsComponent,
    MyrequestsComponent,
    RequestmeComponent,
    ActiveComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AuthModule,
    FormsModule,
    ChatModule,
    MatIconModule,
    MatDividerModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
      { path: 'chat', loadChildren: './components/chat/chat.module#ChatModule', canActivate: [RandomGuard], canLoad: [RandomGuard] },
   
    ]),
    BrowserAnimationsModule
  ],
  providers: [SignalRService, EncrDecrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
