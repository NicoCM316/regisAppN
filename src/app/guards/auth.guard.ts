import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  private async isAuthenticated(): Promise<boolean> {
    try {
      const isAuth = await this.storage.get('isAuthenticated');
      return isAuth || false;  // Retorna false si no está definido
    } catch (error) {
      console.error('Error al verificar autenticación', error);
      return false;  // Devuelve false en caso de error
    }
  }

  async canActivate(): Promise<boolean> {
    const isAuth = await this.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

