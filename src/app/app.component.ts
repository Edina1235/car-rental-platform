import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'car-rental-platform';
  user_id?: string;
  isLoading = false;

  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(_unused => {
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
