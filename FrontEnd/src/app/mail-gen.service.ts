import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MailGenService {

  constructor(private http : HttpClient ) { }

  post = (data:any)=>{
   return this.http.post(`http://localhost:3000/api/product/getbill`,data)
  }
}
