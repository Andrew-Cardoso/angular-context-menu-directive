import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ContextMenuDirective } from './context-menu.directive';
import { ContextMenuContainerComponent } from './context-menu-container/context-menu-container.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, ContextMenuDirective, ContextMenuContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
