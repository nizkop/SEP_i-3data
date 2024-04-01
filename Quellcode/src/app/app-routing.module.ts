import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableviewComponent} from "./tables/tableview/tableview.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {Tableview2Component} from "./tables/tableview2/tableview2.component";
import {Tableview5Component} from "./tables/tableview5/tableview5.component";
import {Tableview3Component} from "./tables/tableview3/tableview3.component";
import {Tableview4Component} from "./tables/tableview4/tableview4.component";
import {Tableview6Component} from "./tables/tableview6/tableview6.component";
import {Tableview8Component} from "./tables/tableview8/tableview8.component";
import {Tableview7Component} from "./tables/tableview7/tableview7.component";
import {TwoFAComponent} from "./two-fa/two-fa.component";
import {UserviewComponent} from "./userview/userview.component";
import {UserlistComponent} from "./userlist/userlist.component";
import {ViewprofileComponent} from "./viewprofile/viewprofile.component";
import {DataviewComponent} from "./dataview/dataview.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";
import {HamburgermenuComponent} from "./hamburgermenu/hamburgermenu.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsertableComponent} from "./usertable/usertable/usertable.component";
import {Usertable2Component} from "./usertable/usertable2/usertable2.component";
import {Usertable3Component} from "./usertable/usertable3/usertable3.component";
import {Usertable4Component} from "./usertable/usertable4/usertable4.component";
import {Usertable5Component} from "./usertable/usertable5/usertable5.component";
import {Usertable6Component} from "./usertable/usertable6/usertable6.component";
import {Usertable7Component} from "./usertable/usertable7/usertable7.component";
import {Usertable8Component} from "./usertable/usertable8/usertable8.component";
import { AuthGuard } from './authenticator/auth.guard';
import {AuthService} from "./authenticator/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./authenticator/auth.interceptor";
import {AuthRoleGuard} from "./authenticator/auth-role.guard";
import {CanDeactivateGuard} from "./authenticator/can-deactivate.guard";
import {InboxComponent} from "./inbox/inbox.component";
import {TicketErstellungComponent} from "./ticket/ticket-erstellung/ticket-erstellung.component";
import {TicketviewComponent} from "./ticket/ticketview/ticketview.component";
import {AdminTicketviewComponent} from "./ticket/admin-ticketview/admin-ticketview.component";
import {TicketDetailsComponent} from "./ticket/ticket-details/ticket-details.component";
import {GeoDatenlistComponent} from "./geo-datenlist/geo-datenlist.component";
import {MapComponent} from "./map/map.component";
import {ChatComponent} from "./chat/chat/chat.component";
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  {path: 'registration', component: RegistrationComponent},
    //Tabellen:
    {path: 'tableview/1', component:TableviewComponent, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/2', component:Tableview2Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/3', component:Tableview3Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/4', component:Tableview4Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/5', component:Tableview5Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/6', component:Tableview6Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/7', component:Tableview7Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/8', component:Tableview8Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},

    //User-Tabellen:
    {path: 'usertable/1', component:UsertableComponent, canActivate: [AuthGuard]},
    {path: 'usertable/2', component:Usertable2Component, canActivate: [AuthGuard]},
    {path: 'usertable/3', component:Usertable3Component, canActivate: [AuthGuard]},
    {path: 'usertable/4', component:Usertable4Component, canActivate: [AuthGuard]},
    {path: 'usertable/5', component:Usertable5Component, canActivate: [AuthGuard]},
    {path: 'usertable/6', component:Usertable6Component, canActivate: [AuthGuard]},
    {path: 'usertable/7', component:Usertable7Component, canActivate: [AuthGuard]},
    {path: 'usertable/8', component:Usertable8Component, canActivate: [AuthGuard]},
    {path: 'map', component:MapComponent, canActivate: [AuthGuard]},

    // Eingangsbereich:
    {path: 'two-fa', component: TwoFAComponent, canDeactivate:[CanDeactivateGuard]},

    //intern:
    {path: 'hamburgermenu',component: HamburgermenuComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'dataview', component: DataviewComponent, canActivate: [AuthGuard]},
    {path: 'geo', component: GeoDatenlistComponent, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},


    {path: 'ticketerstellung', component: TicketErstellungComponent, canActivate: [AuthGuard]},
    {path: 'ticketview', component: TicketviewComponent, canActivate: [AuthGuard]},
    {path: 'ticketdetails/:id', component: TicketDetailsComponent, canActivate: [AuthGuard]},
    {path: 'admin-ticketview', component: AdminTicketviewComponent, canActivate: [AuthGuard,AuthRoleGuard], data: {roles: ['ADMIN']}},

    //User:
    {path: 'userview', component: UserviewComponent, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ViewprofileComponent , canActivate: [AuthGuard]},
    {path: 'editprofile/:id', component: EditprofileComponent, canActivate: [AuthGuard]},
  {path: 'inbox', component: InboxComponent, canActivate:[AuthGuard]},

    //Chat
    {path:'chat', component:ChatComponent, canActivate:[AuthGuard]},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[],
  providers:[AuthGuard,AuthRoleGuard,CanDeactivateGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },]
})
export class AppRoutingModule { }
