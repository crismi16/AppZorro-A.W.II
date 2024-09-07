import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UsersService } from '../../services/users/users.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RegistersService } from '../../services/registers/registers.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule, NzCheckboxModule,NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private registersService: RegistersService) {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    })
  }

  onClickLogin(): void {
    if (this.form.invalid) return;
    this.registersService.login(this.form.value)
    .then((response)=>{
      console.log(response);
    })
    .catch(error=>console.log(error))
  }

  onClickLoginGoogle(): void {
    this.registersService.loginWithGoogle()
    .then((response)=>{
      console.log(response);
    })
    .catch(error=>console.log(error))
  }

}
