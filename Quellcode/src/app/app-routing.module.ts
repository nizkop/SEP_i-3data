import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Tableview1Component} from "./datensaetze/tables/tableview1/tableview1.component";
import {LoginComponent} from "./eingangsbereich/login/login.component";
import {RegistrationComponent} from "./eingangsbereich/registration/registration.component";
import {Tableview2Component} from "./datensaetze/tables/tableview2/tableview2.component";
import {Tableview5Component} from "./datensaetze/tables/tableview5/tableview5.component";
import {Tableview3Component} from "./datensaetze/tables/tableview3/tableview3.component";
import {Tableview4Component} from "./datensaetze/tables/tableview4/tableview4.component";
import {Tableview6Component} from "./datensaetze/tables/tableview6/tableview6.component";
import {Tableview8Component} from "./datensaetze/tables/tableview8/tableview8.component";
import {Tableview7Component} from "./datensaetze/tables/tableview7/tableview7.component";
import {TwoFAComponent} from "./eingangsbereich/two-fa/two-fa.component";
import {UserviewComponent} from "./userprofile/userview/userview.component";
import {UserlistComponent} from "./userprofile/userlist/userlist.component";
import {ViewprofileComponent} from "./userprofile/viewprofile/viewprofile.component";
import {DataviewComponent} from "./dataview/dataview.component";
import {EditprofileComponent} from "./userprofile/editprofile/editprofile.component";
import {HamburgermenuComponent} from "./layout/hamburgermenu/hamburgermenu.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Usertable1Component} from "./datensaetze/usertable/usertable1/usertable1.component";
import {Usertable2Component} from "./datensaetze/usertable/usertable2/usertable2.component";
import {Usertable3Component} from "./datensaetze/usertable/usertable3/usertable3.component";
import {Usertable4Component} from "./datensaetze/usertable/usertable4/usertable4.component";
import {Usertable5Component} from "./datensaetze/usertable/usertable5/usertable5.component";
import {Usertable6Component} from "./datensaetze/usertable/usertable6/usertable6.component";
import {Usertable7Component} from "./datensaetze/usertable/usertable7/usertable7.component";
import {Usertable8Component} from "./datensaetze/usertable/usertable8/usertable8.component";
import { AuthGuard } from './authenticator/auth.guard';
import {AuthService} from "./authenticator/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./authenticator/auth.interceptor";
import {AuthRoleGuard} from "./authenticator/auth-role.guard";
import {CanDeactivateGuard} from "./authenticator/can-deactivate.guard";
import {InboxComponent} from "./inbox/inbox.component";
import {TicketErstellungComponent} from "./ticket/ticket-erstellung/ticket-erstellung.component";
import {TicketviewComponent} from "./ticket/ticketview/ticketview.component";
import {TicketDetailsComponent} from "./ticket/ticket-details/ticket-details.component";
import {GeoDatenlistComponent} from "./datensaetze/geo-datenlist/geo-datenlist.component";
import {MapComponent} from "./map/map.component";
import {ChatComponent} from "./chat/chat/chat.component";
import {ForumErstellungComponent} from "./Forum/forum-erstellung/forum-erstellung.component";
import {ThreadUebersichtComponent} from "./Forum/thread-uebersicht/thread-uebersicht.component";
import {ThreadComponent} from "./Forum/thread/thread.component";
import {ChatBotComponent} from "./chat-bot/chat-bot.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  {path: 'registration', component: RegistrationComponent},
    //Tabellen:
    {path: 'tableview/1', component:Tableview1Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/2', component:Tableview2Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/3', component:Tableview3Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/4', component:Tableview4Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/5', component:Tableview5Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/6', component:Tableview6Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/7', component:Tableview7Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'tableview/8', component:Tableview8Component, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},

    //User-Tabellen:
    {path: 'usertable/1', component:Usertable1Component, canActivate: [AuthGuard]},
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

    {path: 'forumerstellung', component: ForumErstellungComponent},
    {path: 'thread-uebersicht', component: ThreadUebersichtComponent},
    {path: 'thread/:id', component: ThreadComponent, canActivate: [AuthGuard]},

    //User:
    {path: 'userview', component: UserviewComponent, canActivate: [AuthGuard,AuthRoleGuard],data: { roles: ['ADMIN']}},
    {path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ViewprofileComponent , canActivate: [AuthGuard]},
    {path: 'editprofile/:id', component: EditprofileComponent, canActivate: [AuthGuard]},
    {path: 'inbox', component: InboxComponent, canActivate:[AuthGuard]},

    //Chat
    {path:'chat', component:ChatComponent, canActivate:[AuthGuard]},
  {path:'chat-bot', component:ChatBotComponent, canActivate:[AuthGuard]},

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
