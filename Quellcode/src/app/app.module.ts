import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableviewComponent } from './tables/tableview/tableview.component';
// import {HeaderComponent} from "./header/header.component";
import {BottomComponent} from "./bottom/bottom.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import { Tableview2Component } from './tables/tableview2/tableview2.component';
import { Tableview3Component } from './tables/tableview3/tableview3.component';
import { Tableview4Component } from './tables/tableview4/tableview4.component';
import { Tableview5Component } from './tables/tableview5/tableview5.component';
import { Tableview6Component } from './tables/tableview6/tableview6.component';
import { Tableview7Component } from './tables/tableview7/tableview7.component';
import { Tableview8Component } from './tables/tableview8/tableview8.component';
import { TwoFAComponent } from './two-fa/two-fa.component';
import {UserviewComponent} from "./userview/userview.component";
import { UserlistComponent } from './userlist/userlist.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { DataviewComponent } from './dataview/dataview.component';
import {EditprofileComponent} from "./editprofile/editprofile.component";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {HamburgermenuComponent} from "./hamburgermenu/hamburgermenu.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { UsertableComponent } from './usertable/usertable/usertable.component';
import { Usertable2Component } from './usertable/usertable2/usertable2.component';
import { Usertable3Component } from './usertable/usertable3/usertable3.component';
import { Usertable4Component } from './usertable/usertable4/usertable4.component';
import { Usertable5Component } from './usertable/usertable5/usertable5.component';
import { Usertable6Component } from './usertable/usertable6/usertable6.component';
import { Usertable7Component } from './usertable/usertable7/usertable7.component';
import { Usertable8Component } from './usertable/usertable8/usertable8.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AuthInterceptor } from './authenticator/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthGuard} from "./authenticator/auth.guard";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {AuthRoleGuard} from "./authenticator/auth-role.guard";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import { InboxComponent } from './inbox/inbox.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { TicketErstellungComponent } from './ticket/ticket-erstellung/ticket-erstellung.component';
import { TicketviewComponent } from './ticket/ticketview/ticketview.component';
import { AdminTicketviewComponent } from './ticket/admin-ticketview/admin-ticketview.component';
import { TicketDetailsComponent } from './ticket/ticket-details/ticket-details.component';
import {GeoDatenlistComponent} from "./geo-datenlist/geo-datenlist.component";
import { MapComponent } from './map/map.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { ChatComponent } from './chat/chat/chat.component';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { HeaderboxComponent } from './chat/chat-headerbox/headerbox.component';
import { MessageComponent } from './chat/message/message.component';
import { PieChartComponent } from './diagram/piechart/pie-chart.component';
import { BarChartComponent } from './diagram/barchart/bar-chart.component';
import { TreeMapComponent } from './diagram/treemap/tree-map.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    TableviewComponent,
    BottomComponent,
    LoginComponent,
    RegistrationComponent,
    Tableview2Component,
    TwoFAComponent,
    UserviewComponent,
    UserlistComponent,
    ViewprofileComponent,
    Tableview2Component,
    Tableview3Component,
    Tableview4Component,
    Tableview5Component,
    Tableview6Component,
    Tableview7Component,
    Tableview8Component,
    DataviewComponent,
    EditprofileComponent,
    HamburgermenuComponent,
    DashboardComponent,
    UsertableComponent,

    Usertable2Component,
    Usertable3Component,
    Usertable4Component,
    Usertable5Component,
    Usertable6Component,
    Usertable7Component,
    Usertable8Component,
    InboxComponent,
    GeoDatenlistComponent,
    MapComponent,
    TicketErstellungComponent,
    TicketviewComponent,
    AdminTicketviewComponent,
    TicketDetailsComponent,
      PieChartComponent,
      BarChartComponent,
      TreeMapComponent,
      ChatComponent,
      ChatBoxComponent,
      ChatListComponent,
      HeaderboxComponent,
      MessageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        //tableview
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatGridListModule,
        MatSelectModule,
        MatDialogModule,
        //Authenticator
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['http://localhost:8080'],
                disallowedRoutes: ['*'],
            },
        }),
        MatSlideToggleModule,
        MatExpansionModule,
    ],
  providers: [AuthGuard,AuthRoleGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
