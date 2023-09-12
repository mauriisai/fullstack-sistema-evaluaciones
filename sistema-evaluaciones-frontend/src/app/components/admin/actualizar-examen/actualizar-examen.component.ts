import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit {
  
  constructor(private route:ActivatedRoute, private router:Router, private examenService:ExamenService,
    private categoriaService:CategoriaService) { }

  examenId =0;
  examen:any;
  categorias:any;

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerCuestionario(this.examenId).subscribe(
      (data) => {
        this.examen =data;
        console.log(this.examen);
    },
    (error)=> {
      console.log(error); 
    }
    )
  
    this.categoriaService.listarCategorias().subscribe(
      (data) => {
        this.categorias=data;
      }, (error) => {
        console.log(error);
      })
  }
  public actualizarCuestionario(examen:any){
    this.examenService.actualizarCuestionario(this.examen).subscribe(
      (data)=> {
        Swal.fire('Actualizacion Exitosa','Cuestionario actualizado con Exito','success').then(
          (e)=> {
            this.router.navigate(['/admin/examenes']);
          }
        );
    },
    (error) => {
      console.log(error);
      Swal.fire('Error en actualizacion','No se pudo actualizar Cuestionario','error')
    }
    )
  }
}
