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
  private testUsers = [
    {
      username: 'estudiante',
      password: '12345',
      role: 'user' // Usuario normal
    },
    {
      username: 'profesor',
      password: '12345',
      role: 'teacher' // Profesor
    }
  ];

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async login(username: string, password: string): Promise<boolean> {
    const foundUser = this.testUsers.find(user => user.username === username && user.password === password);
    if (foundUser) {
      this.isAuthenticated = true;
      await this.storage.set(this.AUTH_KEY, true);
      await this.storage.set('role', foundUser.role); // Almacena el rol del usuario encontrado
      
      // Redirigir según el rol
      if (foundUser.role === 'teacher') {
        this.router.navigate(['/home-teacher']); // Navega a la página del profesor
      } else {
        this.router.navigate(['/home-student']); // Navega a la página del estudiante
      }
      
      return true;
    }
    return false; // Credenciales inválidas
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
