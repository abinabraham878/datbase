import { UserService } from './../user.service';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import  firestore  from 'firebase/firebase'


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
   pic:string;
   descrip:string;
  constructor(private up:Http,private fire:AngularFirestore ,private user:UserService ,) { }

  ngOnInit() {
  }
fileup(event){
    const upload=event.target.files
    const data=new FormData()
    data.append('file',upload[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','7a81650e41a3a6883168')
    this.up.post('https://upload.uploadcare.com/base/',data ).subscribe(event=>{ console.log(upload);
    this.pic=event.json().file
  })
}

  desc(){
    const img=this.pic;
    const des=this.descrip;
    this.fire.doc(`users/${this.user.getuid()}`).update({posts:firestore.FieldValue.arrayUnion(img,des)})
  }

}