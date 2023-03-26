import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-github-documentation',
  templateUrl: './github-documentation.component.html',
  styleUrls: ['./github-documentation.component.scss']
})
export class GithubDocumentationComponent {
  addRepoForm: any = FormGroup;
  repoAddModal: any;

  constructor(private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder) {
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

  get c(){
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


}

