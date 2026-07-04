import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../auth/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isLogged = false;
  nombreUsuario = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName()!;
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
}
