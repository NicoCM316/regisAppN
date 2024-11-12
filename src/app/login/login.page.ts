import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private storage: Storage) {
    this.storage.create(); // Inicializa el almacenamiento
  }

  async onSubmit() {
    const success = await this.authService.login(this.username, this.password);
    if (success) {
      // await this.storage.set('username', this.username); // Guarda el nombre de usuario
      // this.router.navigate(['/home']); // Navega a la pantalla de inicio
    } else {
      alert('Email o contraseña incorrectos');
    }
  }
}


