import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    baseURL = 'https://api.github.com/repos/';

    constructor(private http: HttpClient) { }

    // getRepository(obj: any): any {
    //     return this.http.get(`${this.baseURL}${obj?.owner}/${obj?.repo}`,)
    // }

    getRepositoryBranches(obj: any): any {
        return this.http.get(`${this.baseURL}${obj?.owner}/${obj?.repo}/branches`,)
    }

    getRepositoryIssues(obj: any): any {
        return this.http.get(`${this.baseURL}${obj?.owner}/${obj?.repo}/issues`,)
    }

    getCommitsInBranch(obj: any): any {
        return this.http.get(`${this.baseURL}${obj?.owner}/${obj?.repo}/commits?sha=${obj?.branch_name}`,)
    }

}
