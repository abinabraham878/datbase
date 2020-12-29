import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from './../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore'



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string;
  address: string;
  password: string;
  email: string;
  username: string;
  

  constructor(private regstr:AngularFireAuth, 
    private alert:AlertController ,
    private users:UserService,
    private fire:AngularFirestore,
    private nav:Router
    
    ) { }

  ngOnInit() {
  }

  async reg(){
  const {password,username} = this
  //console.warn(this.name+"\n"+this.address+"\n"+this.email+"\n"+this.username+"\n"+this.password);

  try{
      const regi=await this.regstr.createUserWithEmailAndPassword(username,password);
      this.fire.doc(`users/${regi.user.uid}`).set({username});
      this.users.setuser({username,uid:regi.user.uid});
      this.presentAlert("success","registered successfully");
      this.nav.navigateByUrl('/tabs');
  }
  catch(err){
    console.dir(err);
    this.presentAlert("warning","NOt registered")
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
