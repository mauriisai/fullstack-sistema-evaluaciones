import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit{

  categoria ={
    'titulo':'',
    'descripcion':''
  }

  constructor(private categoriaService:CategoriaService, private snack:MatSnackBar, private router:Router){ }
  
  ngOnInit(): void {
    
  }

  agregarCategoria(){
    if(this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
      this.snack.open('El titulo es requerido','',{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
      return;
    }
    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (dato:any) => {
        this.categoria.titulo ='';
        this.categoria.descripcion='';
        Swal.fire('Categoria Agregada', 'Categoria agregada con Exito','success');
        this.router.navigate(['/admin/categorias']);
        
      },(error) =>{
        console.log(error);
        Swal.fire('Error', 'No se puedo almacenar la categoria','error');
      }
    )
  }

}
