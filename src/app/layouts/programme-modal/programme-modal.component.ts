import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  child, onValue, push, ref, set } from "firebase/database";
import { FirebaseDBServiceService } from 'src/app/services/firebase-dbservice.service';

@Component({
  selector: 'app-programme-modal',
  templateUrl: './programme-modal.component.html',
  styles: [`
          #header{
            display: flex;
            flex-direction: row;
          }
          .spacer{
            flex: 1 0 auto;
          }

          table{
            width: 80% !important;
            
          }

          .mat-dialog-content{
            height: 80%;
          }
          td{
            text-align: center !important;
          }

          mat-form-field{
            width: clamp(150px, 50px, 150px);
          }
  `]
})
export class ProgrammeModalComponent implements OnInit {

  name: string = ''
  newCourse: string = '';
  courseType: string = 'core';
  coursePeriod  = [] // = new FormControl(); ;
  degreeCourses: {name: string, type: string, offeredIn: {year:number, semester:number}[]}[] = []

  removedCourses: string[] = []
  addedCourses: string[] = []

  periodGroups = [
    {value: {year: 1, semester: 1}, viewValue: 'Year1/Semester1'},
    {value: {year: 1, semester: 2}, viewValue: 'Year1/Semester2'},
    {value: {year: 1, semester: 3}, viewValue: 'Year1/Semester3'},
    {value: {year: 2, semester: 1}, viewValue: 'Year2/Semester1'},
    {value: {year: 2, semester: 2}, viewValue: 'Year2/Semester2'},
    {value: {year: 2, semester: 3}, viewValue: 'Year2/Semester3'},
    {value: {year: 3, semester: 1}, viewValue: 'Year3/Semester1'},
    {value: {year: 3, semester: 2}, viewValue: 'Year3/Semester2'},
    {value: {year: 3, semester: 3}, viewValue: 'Year3/Semester3'},
  ]
  courses: string[] = []
  
  constructor( public dialogRef: MatDialogRef<ProgrammeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private firebase: FirebaseDBServiceService, private snackBar: MatSnackBar) {
    
    if( data.degree){
      this.name = data.degree.name 
      
      for (let c of data.degree.courses)
        this.degreeCourses.push( {name: c.courseName, type: c.type, offeredIn: c.offeredIn} )
      
    }
    // Object.entries(data.degree.courses).forEach( (entry: any)=>{
    //   let [key, value] = entry
    //   this.degreeCourses.push( {name: value.courseName, type: value.type, offeredIn:value.offeredIn} )
    // })

    //Get Firebase data
    const tablesRef = ref(this.firebase.dbRef, '/courses');
    onValue(tablesRef, (snapshot) => {
      for( let i=0; i< this.courses.length ; i++){
        this.courses.pop()
      }

      const data = snapshot.val();
      
      
      if ( !data  )return 

      //console.log(data.events)
      Object.entries(data).forEach( (entry: any )=>{
        const [key, value] = entry;
        this.courses.push(key)
      })
   });

  }

  ngOnInit(): void {
  }

  isDuplicateCourse(name: string){

    if( this.degreeCourses.length != 0)  
      for(let course of this.degreeCourses)
        if(course.name == name)
          return true

    return false
  }

  addCourse(){
    //this.degreeCourses.push({courseName: this.newCourse})
    // console.log('Course Code', this.newCourse)
    // console.log('Course Type', this.courseType)
    // console.log('Period', this.coursePeriod)


    if( this.isDuplicateCourse(this.newCourse) == true )
      this.displayMsg("This course already exists")
    else if( this.newCourse!= '' && this.courseType!= '' && this.coursePeriod.length > 0 ){
      this.degreeCourses.push({name: this.newCourse, type: this.courseType, offeredIn: this.coursePeriod})

      // KEEP TRACK OF COURSE MODIFICATIONS
      this.addedCourses.push(this.newCourse)
      // check if course was previously removed
      if( this.removedCourses.includes(this.newCourse) ){
        //get index and delete from removedCourses
        let courseIndex = this.removedCourses.indexOf(this.newCourse)
        this.removedCourses.splice(courseIndex,1)
      }
        
    }
      
    else
      this.displayMsg("Invalid Course Input!")
  }

  removeRow(index: number){
    let row = this.degreeCourses.splice(index, 1)
    let isPresent = false
    // KEEP TRACK OF COURSE MODIFICATIONS
    this.removedCourses.push(row[0].name)
    // check if course was previously addedd
    if( this.addedCourses.includes(row[0].name) ){
      //get index and delete from 
      isPresent = true
      let courseIndex = this.addedCourses.indexOf(row[0].name)
      this.addedCourses.splice(courseIndex,1)
    }
    let snackBarRef = this.snackBar.open( "Course deleted!", "undo",{
      duration: 3000
    });

    snackBarRef.onAction().subscribe( ()=>{
      console.log("Deleted Row", row)
      //add back deleted course
      if( isPresent) //to account for courses that were not part of the original array
        this.addedCourses.push(row[0].name)
      this.removedCourses.pop()

      this.degreeCourses.push(row[0])
      snackBarRef.dismiss();

      let newSnackBar = this.snackBar.open( "Course restored!", "close", {duration: 3000} )
      newSnackBar.onAction().subscribe( ()=>{
        newSnackBar.dismiss();
      })
    });
  }

  async onSave(){

    if(this.name =='' || this.courseType =='' || this.degreeCourses.length== 0) return 

    let newProgramme: {[key:string]: { [key:string]: {} }} = {}
    newProgramme[`${this.name}`] = {}

    //for each course, create course object & set it in newProgramme
    for (let course of this.degreeCourses){
      newProgramme[`${course.name}`] = { type: course.type, offeredIn: course.offeredIn }//course

      //update each course's list of degree 
    }

    let notFoundMsg = ""
    for( let course1 of this.addedCourses){
      let successful = await this.firebase.updateCourseDegree(this.name, course1, true)
      if ( !successful ) notFoundMsg += course1 + "\n "
    }
      

    for( let course2 of this.removedCourses){
      let successful = await this.firebase.updateCourseDegree(this.name, course2, false)
      if ( !successful ) notFoundMsg += course2 + "\n "
    }
    
    console.log("Saving ", newProgramme)
    if (notFoundMsg != ""){
      this.displayMsg(notFoundMsg + "were not found to be updated!")
      
    }
    else
      this.writeProgramme(newProgramme, this.name)
    this.dialogRef.close();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  writeProgramme(newProgramme : any, id:string) {
    // Get a key for a new Post.
    // const newPostKey = push(child(ref(this.firebase.dbRef), 'coursesPerProgramme')).key;
    // newEvent.id = newPostKey

    //set new Programme at 
    set(ref(this.firebase.dbRef, 'coursesPerProgramme/' + id ), newProgramme);
  }

  // updateProgramme( newEvent: any, id: string){
  //   // Write the new post's data simultaneously in the posts list and the user's post list.
  

  //   set(ref(this.firebase.dbRef, 'coursesPerProgramme/' + id), newEvent);
  // }

  displayMsg(message: string ){
    let snackBarRef = this.snackBar.open(message, "close",{
      duration: 3000
    });

    snackBarRef.onAction().subscribe( ()=>{
      snackBarRef.dismiss();
    })
  }

}
