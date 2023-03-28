import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

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

  constructor(private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder,
    private toaster: ToastrService, private commonservice: CommonService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // ngDoCheck(): void {
  //   this.clickRepoDiv ;
  // }

  ngOnInit(): void {
    this.repoForms();
    this.commonservice.getRepository().subscribe((res: any) => {
      console.log(res, 'postData');
    })
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

    this.repositoryDetails.push(
      {
        repo_name: this.addRepoForm.value.owner,
        repo_description: this.addRepoForm.value.repo_name
      })
    this.closeAddRepoDialog()

  }

  onClickRepoGetBranchDetails(repo: any, i: any) {
    this.clickRepoDiv = i;
    console.log(this.clickRepoDiv);

    this.commonservice.getBranches().subscribe((res: any) => {
      this.branchesList = res;
      console.log(this.branchesList, 'branchesList');
    });

    this.commonservice.getIssues().subscribe((res: any) => {
      this.issuesList = res;
      console.log(this.issuesList, 'issuesList');
    });

  }


  onClickBranchGetCommitDetails(branch: any, commit: any) {
    this.branchName = branch.name;
    this.commitModal = this.modalService.open(commit, {
      windowClass: 'commit',
    });

    this.commonservice.getCommits().subscribe((res: any) => {
      this.commitsList = res;
      this.commitsList.forEach(x => {
        var dob = new Date(x.commit.author.date);
        var dobArr = dob.toDateString().split(' ');
        var dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
        x.commit.author.date = dobFormat;
      })
      console.log(this.commitsList, 'commitsList');
    })

  }

  closeCommitDialog() {
    this.commitModal.close();
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

