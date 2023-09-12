import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    "username": "",
    "password": ""
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {

  }

  ingresar() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('El nombre de usuario es requerido', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La clave de usuario es requerida', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe((data: any) => {
      // Imprimir en consola el token PRUEBA
      console.log(data);

      this.loginService.loginUser(data.token);
      this.loginService.getCurrentUser().subscribe((user: any) => {

        // Estableciendo en el localStorage el user
        this.loginService.setUser(user);
        // Imprimir en consola el user PRUEBA
        console.log(user);
        
        // Verificando el Rol del Usuario Logueado
        if (this.loginService.getUserRol() == "ADMIN") {
          this.loginService.loginStatusSubject.next(true);
          // Mostrar el Dashboard del ADMIN
          this.router.navigate(['admin']);
        } else if (this.loginService.getUserRol() == "NORMAL") {
          this.loginService.loginStatusSubject.next(true);
          // Mostrar el Dashboard del USER 'NORMAL'
          this.router.navigate(['user-dashboard/']);
          
        } else {
          this.loginService.logout();
        }
         
      });

    }, (error) => {
      console.log(error);
      this.snack.open('Credenciales Invalidas', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }
}

