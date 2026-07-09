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
  isAdmin = false;

  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      const roles = this.tokenService.getAuthorities();
      this.isAdmin = roles.includes('ROLE_ADMIN');
      } else {
      this.isLogged = false;
      this.isAdmin = false;
    }
  }
irRegistro(): void {
  console.log('Entrando a registro...');
  this.router.navigate(['/registro']).then(ok => {
    console.log('Navegó:', ok);
  });
}
  onLogOut(): void {
     console.log('SE EJECUTÓ LOGOUT');
    this.tokenService.logOut();
    //this.isLogged = false;
    //window.location.reload();
    this.router.navigate(['/login'], {
    replaceUrl: true
  })
  }
}
