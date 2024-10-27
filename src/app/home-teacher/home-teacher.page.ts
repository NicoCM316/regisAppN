import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router, private storage: Storage) {}

  async ngOnInit() {
    const isAuthenticated = await this.authService.checkAuth();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      this.username = await this.storage.get('username'); // Recupera el nombre de usuario
    }
  }

  logout() {
    this.authService.logout();
  }
}

