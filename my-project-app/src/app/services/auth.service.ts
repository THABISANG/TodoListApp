import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { signupPostData, User } from "../interfaces/auth";
import { Password } from "primeng/password";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class AuthService {
    private baseUrl = "https://localhost:3000";
    constructor(private http:HttpClient){ }
    signupUser(postData:signupPostData){
        return this.http.post(`${this.baseUrl}/users`, postData);
    }
    getUserDetails(email:string,password:string):Observable<User[]> { 
    return this.http.get<User[]>(
        `${this.baseUrl}users?email=${email}&password$password{}`);
         }
}