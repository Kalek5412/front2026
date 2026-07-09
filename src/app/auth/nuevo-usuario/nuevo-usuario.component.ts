import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../../models/nuevo-usuario';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
  registerForm!: FormGroup;
  isLogged = false;
  
  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
      this.registerForm = this.fb.group({ 
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const nuevoUsuario = new NuevoUsuario(
      this.registerForm.value.nombre,
      this.registerForm.value.nombreUsuario,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this.authService.nuevo(nuevoUsuario).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Cuenta creada',
          text: 'Ahora puedes iniciar sesión',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/']);

      },

      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.mensaje
        });

      }

    });

  }
}
