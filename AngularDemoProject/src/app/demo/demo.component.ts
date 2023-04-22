import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  skillsForm: FormGroup;
  isShown = true;
  constructor(private fb:FormBuilder) {
    this.skillsForm = this.fb.group({
      name: '',
      skills: this.fb.array([]) ,
    });
  }
  
  ngOnInit(): void {
    this.addSkills();
  }
  // toggleShow(){
  //   this.isShown = !this.isShown;
  // }
  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }
  
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
 }
 addSkills() {
  this.skills.push(this.newSkill());
}
removeSkill(i:number) {
  this.skills.removeAt(i);
}
onSubmit() {
  console.log(this.skillsForm.value);
}

}
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
