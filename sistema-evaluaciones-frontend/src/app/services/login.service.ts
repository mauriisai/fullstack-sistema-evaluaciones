import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) {  }

  // Generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token` , loginData)
  }

  // Iniciamos sesion y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    let tokenStr =localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null ){
      return false;
    }else {
      return true;
    }
  }

  // Cerramos sesion y eliminamos el token de localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
    
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  
  // Obt. el usuario del localStorage
  public getUser(){
    let userStr =localStorage.getItem('user');
    
    if(userStr!=null ){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  // Obt. el Rol del User
  public getUserRol(){
    let user =this.getUser();
    return user.authorities[0].authority;
    
  }

  // Obt. user actual
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

}
