import { UserService } from './../user.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(
      private login:AngularFireAuth,
      private alert:AlertController,
      private nav:Router,
      private users:UserService) { }

  ngOnInit() {
  }

async log(){
  const {username,password} =this
  console.warn(this.username+"\n"+this.password)

  try{
     const sign=await this.login.signInWithEmailAndPassword(username,password);
     if(sign.user){
        this.users.setuser({username,uid:sign.user.uid})
        this.nav.navigateByUrl('/tabs');
     }
     
  }
  catch(err){
      console.dir(err);
      this.presentAlert("warning","Invalid User")
  }
}

async presentAlert(header:string,message:string) {
  const alert = await this.alert.create({
    header,
    message,
    buttons: ['OK']
  });

  await alert.present();
}

}
