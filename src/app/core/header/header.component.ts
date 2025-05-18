import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Role, User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role: Role = Role.User;
  Role = Role;
  activeRoute?: string;

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (data) => {
        const scroll = (data as Scroll);
        if(scroll && scroll.routerEvent)
          this.activeRoute = scroll.routerEvent.url;
        console.log(this.activeRoute);
      }
    });
    const user_id = localStorage.getItem("user_id");
    if(user_id)
      this.userService.getUserWithId(user_id).subscribe(user => {
          const USER = user as User;
          this.role = USER.role;
      });
  }

  public onClickLogout() {
    this.authService.logout().subscribe({
           next: (data) => {
              console.log(data);
              localStorage.removeItem('user_id');
              this.router.navigateByUrl('/login');
            }, error: (err) => {
              console.log(err);
            }
          });
  }

  public onClickAdminHome() {
    this.router.navigateByUrl('/admin/home');
  }

  public onClickAdminCars() {
    this.router.navigateByUrl('/admin/cars');
  }

  public onClickAddNewCar() {
    this.router.navigateByUrl('/admin/add-new-rental-car');
  }

  public onClickAddNewExtraService() {
    this.router.navigateByUrl('/admin/add-new-extra-service');
  }

  public onClickUserRentedCars() {
    this.router.navigateByUrl('/car-rental-platform/rented-cars');
  }

  public onClickUserHome() {
    this.router.navigateByUrl('/car-rental-platform/home');
  }
}
