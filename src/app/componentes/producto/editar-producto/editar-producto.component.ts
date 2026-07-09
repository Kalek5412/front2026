import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import { Producto } from '../../../models/producto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit{

  producto!: Producto;

constructor(
  private productoService: ProductoService,
  private activatedRoute: ActivatedRoute,
  private router: Router
) {}

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
        showConfirmButton: false
      });

      this.router.navigate(['/']);
    }
  );
}

onUpdate(): void {
  const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  this.productoService.update(id, this.producto).subscribe(
    data => {

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'El producto fue actualizado correctamente',
        timer: 3000,
        showConfirmButton: false
      });

      this.router.navigate(['/producto/lista']);
    },
    err => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error?.mensaje || 'No se pudo actualizar el producto',
        timer: 3000,
        showConfirmButton: false
      });

    }
  );
}

}
