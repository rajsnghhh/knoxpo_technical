import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-github-documentation',
  templateUrl: './github-documentation.component.html',
  styleUrls: ['./github-documentation.component.scss']
})
export class GithubDocumentationComponent {
  addRepoForm: any = FormGroup;
  repoAddModal: any;
  index: number = 0;

  constructor(private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder,
    private toaster: ToastrService,) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.repoForms();
  }

  repoForms() {
    this.addRepoForm = this.fb.group({
      owner: ['', Validators.required],
      repo_name: ['', Validators.required]
    });
  }

  get c() {
    return this.addRepoForm.controls;
  }

  addNewRepositoryDialog(repository: any) {
    this.repoAddModal = this.modalService.open(repository, {
      windowClass: 'repository',
    });
  }

  closeAddRepoDialog() {
    this.repoAddModal.close()
    this.addRepoForm.reset()
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.index = tabChangeEvent.index;
  }

  addRepo() {
    console.log(this.addRepoForm.value.owner);
    if (this.addRepoForm.value.owner.search(' ') != -1) {
      this.showError("Username cannot contain spaces");
    }

 
  }

  showSuccess(message: any) {
    this.toaster.success(message, 'Github-Documentation', {
      timeOut: 3000,
    });
  }


  showError(message: any) {
    this.toaster.error(message, 'Github-Documentation', {
      timeOut: 3000,
    });
  }

}

