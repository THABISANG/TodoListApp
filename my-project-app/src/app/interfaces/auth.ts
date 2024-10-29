export interface signupPostData {
    fullName: string;
    email:string;
    password:string;
}
export interface User extends signupPostData{
    id:string
}
