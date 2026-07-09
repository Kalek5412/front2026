import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

canActivate(route: ActivatedRouteSnapshot): boolean {

  const token = this.tokenService.getToken();
  console.log('TOKEN =>', token);

  if (!token) {
    console.log('NO HAY TOKEN');
    this.router.navigate(['/login']);
    return false;
  }
  const expectedRol = route.data['expectedRol'] as string[];
  console.log('Roles esperados:', expectedRol);

  const roles = this.tokenService.getAuthorities();
  console.log('Roles del usuario:', roles);

  const autorizado = expectedRol.some(role => roles.includes(role));
  console.log('Autorizado:', autorizado);

  if (!autorizado) {
    console.log('NO AUTORIZADO');
    this.router.navigate(['/']);
    return false;
  }
  console.log('AUTORIZADO');
  return true;
}
}