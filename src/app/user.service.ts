import { Injectable } from '@angular/core';

interface users{username:string, uid:string}

@Injectable({
  providedIn: 'root'
})


export class UserService {
 
  private users:users
  
  constructor() { }

  setuser(users:users){
    this.users=users
  }
  getuid(){
    return this.users.uid
  }
}
