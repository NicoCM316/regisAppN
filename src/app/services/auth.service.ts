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
  try {
    const resp = await fetch('http://presenteprofe.cl/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: username,
        password
      })
    });

    const { data, auth } = await resp.json();

    if (resp.ok && auth.token) {  // Verificar que la respuesta sea exitosa
      const role = data.perfil;
      const username = data.nombre + " " + data.apellido;
      this.isAuthenticated = true;
      await this.storage.set(this.AUTH_KEY, true);
      await this.storage.set('role', role);
      await this.storage.set('username', username);

      if (role === 'estudiante') {
        this.router.navigate(['/home-student']);
      } else if (role === 'docente') {
        this.router.navigate(['/home-teacher']);
      }
      return true;
    } else {
      console.log('Credenciales inválidas o error en la API');
      return false;
    }
  } catch (error) {
    console.error('Error al hacer login', error);
    return false;
  }
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
