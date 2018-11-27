import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessageValidationComponent } from './message-validation/message-validation.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FullscreenLayoutComponent } from './fullscreen-layout.component';
import { MessagesService } from './messages.service';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations:
    [MessageValidationComponent, NotfoundComponent, FullscreenLayoutComponent],
  exports:
    [MessageValidationComponent, NotfoundComponent, FullscreenLayoutComponent],
  providers:
    [MessagesService]
})
export class AppSharedModule { }
