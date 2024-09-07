import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Register, RegistersService } from '../../services/registers/registers.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  register: Register[] = [];

  constructor(private registersService: RegistersService) { }

  ngOnInit(): void {
    this.getRegisters();
  }

  getRegisters(): void {
    this.registersService.getRegisters().subscribe(rs => {this.register = rs;console.log(rs)});
  }
}
