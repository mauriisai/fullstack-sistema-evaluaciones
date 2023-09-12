import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {

  }

  registrarUsuario() {
    console.log(this.user);
    if (this.user.username == "" || this.user.username == null) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: 'No se pudo registrar usuario'
      })
      return;
    }

    this.userService.agregarUsuario(this.user).subscribe(
      (data)=> {
        console.log(data)
        Swal.fire('Usuario guardado','Usuario registrado con Exito','success');
        
      }, (error) => {
        console.log(error);
        Swal.fire('Error del Sistema', 'Lo sentimos! El sistema esta presentando fallas.','error');
      })
  }

}
