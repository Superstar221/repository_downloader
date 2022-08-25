declare var require: any
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  repos: string[]=[];
  constructor(
    private http: HttpClient) { }
  getRepoData(url:any){
    return this.http.get(url)
  }
  getRepoDataSynchronous(username:string):Promise<any>{
    const url = "https://api.github.com/users/" + username + "/repos";
    return this.getRepoData(url).toPromise();
  }
  async download(name:string){
    let response = await this.getRepoDataSynchronous(name);
    
    const fs = require('fs');
    let output=""
    for(var i = 0 ; i < response.length; i ++){
      this.repos.push(response[i]["clone_url"]);

      output = output.concat("git clone ");
      output = output.concat(response[i]["clone_url"]);
      output = output.concat("\n");
    } 
    
    this.writeContents(output, 'download.bat', 'text/plain');
  //   fs.writeFile('../../Github repo/download.bat', output, (err : any) => {
  //     if (err) throw err;
  //     console.log('Data written to file');
  // }); 
  }

  writeContents(content:string, fileName:string, contentType:string) {
    var a = document.createElement('a');
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
