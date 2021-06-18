import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm !: FormGroup;
  public hide = true;
  public errorMessage!:string;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private auth: JwtService,private api:ApiService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  signIn() {
    this.auth.loginUser(this.signInForm.value).subscribe((success)=>{
      let accountType = JSON.parse(atob(success.access_token.split(".")[1])).user.accountType
      this.auth.isloggedIn.next(accountType);
      if (accountType == "Organisation") {
        this.router.navigate(['/organisationdashboard'])
      }
      else if(accountType == "Personal") 
      {
        // this.auth.isloggedIn.next(accountType);
        this.router.navigate(['/userdashboard'])
      }
    },
    ((error:any)=>{
      this.errorMessage='Username or Password is incorrect';
      // console.log(error)
    }))
    // this.auth.isUserloggedIn.next(user);
 

  }
  createAccount() {
    const dialogRef = this.dialog.open(SignUpDialog, {
      // data: { details: personDetail }
      width: '400px',
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        delete result.confirmPassword
        this.api.regiseterUser(result).subscribe((success:any)=>{
          this.snackBar.open(success.message, 'Close', { duration: 3000 });
        },
        ((error:any)=>{
          this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
        })
        )
        // this.snackBar.open(success.message, 'Close', { duration: 3000 });
      }
      // this.snackBar.open("Email successfully sent", 'Close', { duration: 3000 });
    });
  }

}
@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpDialog {
  public hide = true;
  public passwordHide = true;
  public confirmPasswordHide = true;
  signUpForm !: FormGroup;
  confirmPasswordError: string = "";
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SignUpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: "") { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        fullname: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        phonenumber: ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\\S]{8,32}')]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: ConfirmedValidator('password', 'confirmPassword') }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  signUp() {
  }
}
export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const matchingControl = controls.get(matchingControlName);
    if (matchingControl?.errors && !matchingControl?.errors.confirmedValidator) {
      return null;
    }
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ confirmedValidator: true });
      return { mustMatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  }
}
