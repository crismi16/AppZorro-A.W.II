import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RegistersService } from '../../services/registers/registers.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink ,NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule, NzCheckboxModule, NzSelectModule, NzIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private registersService: RegistersService) {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      checkPassword: ['',this.confirmationValidator],
      nickname: ['',[Validators.required]],
      photoURL: [''],
      phoneNumber: ['',[Validators.required]],
      role: ['Empleado'],
    })
  }

  onClickRegister(): void {
    if (this.form.invalid) return;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.registersService.createRegister({email, password}, this.form.value)
    .then((response)=>{
      console.log(response);
    })
    .catch(error=>console.log(error))
  }
  onClickRegisterWithGoogle(): void {
    this.registersService.createRegisterWithGoogle()
    .then((response)=>{
      console.log(response);
    })
    .catch(error=>console.log(error))
  }

  updateConfirmValidator(): void {

    Promise.resolve().then(() => this.form.controls["checkPassword"].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}

