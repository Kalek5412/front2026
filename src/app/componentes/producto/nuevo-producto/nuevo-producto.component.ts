import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Producto } from '../../../models/producto';


@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent implements OnInit{

  nombre = '';
  precio: number | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router
    ) { }

  ngOnInit() {
  }

cancelar() {
  this.router.navigate(['/producto/lista']);
}

  onCreate(): void {

    const producto: Producto = {
      id: 0,
      nombre: this.nombre,
      precio: this.precio ?? 0
      };

      this.productoService.save(producto).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Producto Creado',
            text: 'El producto se registró correctamente',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/producto/lista']);
        },

        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.mensaje || 'No se pudo crear el producto',
            timer: 3000,
            showConfirmButton: false
          });
        }
  );
  }
}
