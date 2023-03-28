import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    baseURL = 'https://api.github.com/repos/';

    constructor(private http: HttpClient) { }

    getRepository(): any {
        return this.http.get(`${this.baseURL}knoxpo/firefunctions`,)
    }

    getBranches(): any {
        return this.http.get(`${this.baseURL}knoxpo/firefunctions/branches`,)
    }

    getIssues(): any {
        return this.http.get(`${this.baseURL}jquery/jquery/issues`,)
    }

    getCommits(): any {
        return this.http.get(`${this.baseURL}jquery/jquery/commits?sha=2.2-stable`,)
    }


}
