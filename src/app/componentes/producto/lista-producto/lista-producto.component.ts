import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../service/producto.service';
import { TokenService } from '../../../auth/token.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-lista-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-producto.component.html',
  styleUrl: './lista-producto.component.css'
})
export class ListaProductoComponent implements OnInit {
  
  productos: Producto[] = [];
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
      
      }
    });
  }

  borrar(id: number): void {
      console.log('ID recibido:', id);
  this.productoService.delete(id).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto fue eliminado correctamente.',
        timer: 2000,
        showConfirmButton: false
      });

      this.cargarProductos();
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
