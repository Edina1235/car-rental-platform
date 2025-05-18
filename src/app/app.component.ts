import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserService } from './shared/services/user.service';
import { Role, User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'car-rental-platform';
  user_id?: string;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.onRouteChange();
    });
  }

  onRouteChange() {
    this.isLoading = true;
    const id = localStorage.getItem('user_id');
    if(id !== null) this.user_id = id;
    else this.user_id = undefined;
  }
}
