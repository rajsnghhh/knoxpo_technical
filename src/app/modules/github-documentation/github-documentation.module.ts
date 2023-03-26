import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubDocumentationRoutingModule } from './github-documentation-routing.module';
import { GithubDocumentationComponent } from './github-documentation.component';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GithubDocumentationComponent
  ],
  imports: [
    CommonModule,
    GithubDocumentationRoutingModule,
    MatCardModule,
    NgbModule, ReactiveFormsModule
  ]
})
export class GithubDocumentationModule { }
