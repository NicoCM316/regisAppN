import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
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

