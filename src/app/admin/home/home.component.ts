import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/core/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users?: User[];
  Role = Role;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data as User[];
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  onClickDelete(id?: string) {
    if(id)
      this.userService.deleteUserWithId(id).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        }, error: (error) => {
          console.log(error);
        }
      });
  }
}
