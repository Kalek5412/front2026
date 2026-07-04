import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../../models/login-usuario';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent implements OnInit{

  isLogged = false;
  isLoginFail = false;
  loginForm!: FormGroup;
  
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    const loginUsuario: LoginUsuario = this.loginForm.value;
    this.authService.login(loginUsuario).subscribe(
      data => {
         console.log(data);

        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
         Swal.fire({
          toast: true,
          position: 'top',
          icon: 'success',
          title: 'Bienvenido ' + data.nombreUsuario,
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errMsj
        });
        // console.log(err.error.message);
      }
    );
  }
}
