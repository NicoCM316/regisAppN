import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private readonly AUTH_KEY = 'isAuthenticated';

  // Usuario de prueba
  private testUser = {
    username: 'email',
    password: '12345'
  };

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async login(username: string, password: string): Promise<boolean> {
    // Aquí puedes validar con datos fijos (ej., un usuario de prueba)
    if (username === 'email' && password === '12345') {
      this.isAuthenticated = true;
      await this.storage.set(this.AUTH_KEY, true);
      return true;
    }
    return false;
  }

  async logout() {
    this.isAuthenticated = false;
    await this.storage.remove(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  async checkAuth(): Promise<boolean> {
    const auth = await this.storage.get(this.AUTH_KEY);
    return auth === true;
  }
}
