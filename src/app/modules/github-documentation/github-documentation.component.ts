import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-github-documentation',
  templateUrl: './github-documentation.component.html',
  styleUrls: ['./github-documentation.component.scss']
})
export class GithubDocumentationComponent {
  addRepoForm: any = FormGroup;
  repoAddModal: any;
  commitModal: any;
  index: number = 0;
  repositoryDetails: Array<any> = [];
  branchesList: Array<any> = [];
  commitsList: Array<any> = [];
  issuesList: Array<any> = [];
  clickRepoDiv: any;
  branchName: any;
  deleteActive: boolean = false;

  constructor(private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder,
    private toaster: ToastrService, private commonservice: CommonService, public validationService: ValidationService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.repoForms();
    // this.commonservice.getRepository().subscribe((res: any) => {
    //   console.log(res);
    // })
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
    if (!this.addRepoForm.value.owner) {
      this.showError("Owner/ Organization should not be empty");
      return;
    }

    if (!this.addRepoForm.value.repo_name) {
      this.showError("Repository Name should not be empty");
      return;
    }

    if (this.addRepoForm.value.owner) {
      if (this.addRepoForm.value.owner.trim() == '') {
        this.showError("Owner/ Organization should not be empty");
        return;
      }
    }

    if (this.addRepoForm.value.repo_name) {
      if (this.addRepoForm.value.repo_name.trim() == '') {
        this.showError("Repository Name should not be empty");
        return;
      }
    }

    this.repositoryDetails.push(
      {
        owner_name: this.addRepoForm.value.owner.trim(),
        repo_name: this.addRepoForm.value.repo_name.trim()
      })
    this.closeAddRepoDialog();

  }

  onClickRepoGetBranchDetails(repo: any, i: any) {
    this.clickRepoDiv = i;
    this.deleteActive = true;
    // console.log(this.deleteActive, 'this.deleteActive');
    // console.log(this.clickRepoDiv);

    this.commonservice.getRepositoryBranches().subscribe((res: any) => {
      this.branchesList = res;
      console.log(this.branchesList, 'branchesList');
    });

    this.commonservice.getRepositoryIssues().subscribe((res: any) => {
      this.issuesList = res;
      console.log(this.issuesList, 'issuesList');
    });

  }


  onClickBranchGetCommitDetails(branch: any, commit: any) {
    this.branchName = branch.name;
    this.commitModal = this.modalService.open(commit, {
      windowClass: 'commit',
    });

    this.commonservice.getCommitsInBranch().subscribe((res: any) => {
      this.commitsList = res;
      this.commitsList.forEach(x => {
        var dob = new Date(x.commit.committer.date);
        var dobArr = dob.toDateString().split(' ');
        var dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
        x.commit.committer.date = dobFormat;
      })
      console.log(this.commitsList, 'commitsList');
    })

  }

  closeCommitDialog() {
    this.commitModal.close();
  }

  removeRepository() {
    let text = "Are you sure you want to delete the selected repository ?";
    if (confirm(text) == true) {
      this.repositoryDetails.splice(this.clickRepoDiv, 1);
      this.branchesList = [];
      this.issuesList = [];
      this.clickRepoDiv = -1;
      this.deleteActive = false;
      // console.log(this.repositoryDetails);
      if (this.repositoryDetails.length == 0) {
        this.deleteActive = false;
      }
    }

  }

  showSuccess(message: any) {
    this.toaster.success(message, 'Github-Documentation', {
      timeOut: 2000,
    });
  }

  showError(message: any) {
    this.toaster.error(message, 'Github-Documentation', {
      timeOut: 2000,
    });
  }

}

