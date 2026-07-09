import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [
        CommonModule,
        FormsModule,
  
  ],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit  {
producto!: Producto;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
    err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error?.mensaje || 'No se pudo cargar el producto',
        timer: 3000,
        showConfirmButton: false,
        position: 'center'
      });

      this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/producto/lista']);
  }
}
