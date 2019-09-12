import { AuthGuard } from "./../../guart/auth.guard";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
} from "@angular/material";
import { UsersComponent } from "./users/users.component";
import { NgxsModule } from "@ngxs/store";
import { UsersState } from "./users.state";
import { UserCreateComponent } from './user-create/user-create.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { ClientCreateComponent } from './client-create/client-create.component'
import { ClientListComponent } from './client-list/client-list.component';
import { ClientState } from './client.state';

const routs: Routes = [
    {
        path: "panel",
        component: ControlPanelComponent,
        canActivate: [AuthGuard]
    }
];
@NgModule({
    declarations: [ControlPanelComponent, UsersComponent, UserCreateComponent, ClientCreateComponent, ClientListComponent],
    imports: [
        BrowserModule,
        RouterModule.forChild(routs),
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        NgxsModule.forFeature([UsersState, ClientState]),
        MatIconModule,
        MatGridListModule,
        MatDialogModule
    ],
    entryComponents: [ControlPanelComponent, UserCreateComponent, ClientCreateComponent],
    providers: [AuthGuard]
})
export class LoggedModule { }
