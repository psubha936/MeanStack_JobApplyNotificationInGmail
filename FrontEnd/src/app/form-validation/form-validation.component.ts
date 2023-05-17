import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailGenService } from '../mail-gen.service';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {

constructor(private ser:MailGenService){}


  onSubmit(myForm:NgForm){
    console.log('submited' , myForm)
    if(myForm.valid){
      this.post.userEmail = myForm.value.Mail
      this.post.name = myForm.value.Name
      console.log('form is valid', this.post)
      this.DataPost()
  }else{
    console.log('form is Invalid')
  }
}

 post = {
  userEmail : String,
  name : String
}

  DataPost(){
      this.ser.post(this.post).subscribe((data)=>{
        console.log(data);
      })
  }
}
