import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLogged = false;

  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    window.location.reload();
  }
}
