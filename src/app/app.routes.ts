import { Routes } from '@angular/router';
import { LoginUsuarioComponent } from './auth/login-usuario/login-usuario.component';
import { NuevoUsuarioComponent } from './auth/nuevo-usuario/nuevo-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaProductoComponent } from './componentes/producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './componentes/producto/nuevo-producto/nuevo-producto.component';
import { DetalleProductoComponent } from './componentes/producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './componentes/producto/editar-producto/editar-producto.component';
import { HomeComponent } from './dashboard/home/home.component';

export const routes: Routes = [

  { path: 'login', component: LoginUsuarioComponent },
  { path: 'registro', component: NuevoUsuarioComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: '/producto',
        children: [
          { path: 'lista', component: ListaProductoComponent },
          { path: 'nuevo', component: NuevoProductoComponent },
          { path: 'detalle/:id', component: DetalleProductoComponent },
          { path: 'editar/:id', component: EditarProductoComponent } ]       
      },
    ]
  },

  
  { path: '**', redirectTo: '' }
];
