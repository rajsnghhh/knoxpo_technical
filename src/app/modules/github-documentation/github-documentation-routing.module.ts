import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubDocumentationComponent } from './github-documentation.component';

const routes: Routes = [{ path: '', component: GithubDocumentationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubDocumentationRoutingModule { }
