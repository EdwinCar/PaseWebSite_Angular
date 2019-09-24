import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngRouterLink() {
    // this.router.navigate(['/login']);
    this.router.navigate(['/membership/business']);
    console.log('Sidebar', this.router.url);
  }

}
