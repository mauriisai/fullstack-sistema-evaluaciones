import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit {
  
  examenId:any;
  titulo:any;
  preguntas:any=[];

  constructor(private route:ActivatedRoute, private preguntaService:PreguntaService, private snack:MatSnackBar) { }
  
  ngOnInit(): void {
    this.examenId= this.route.snapshot.params['examenId'];
    this.titulo= this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data:any) => {
        this.preguntas=data;
        
      }, (error) => {
        console.log(error);
      })
  }

  public eliminarPregunta(preguntaId:any){
    Swal.fire({
      title:'Eliminar Pregunta',
      text:'Estas seguro que quieres eliminar esta pregunta?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.preguntaService.eliminarPregunta(preguntaId).subscribe(
          (data) => {
            this.snack.open('Pregunta Eliminada', '', { 
              duration:2000,
              verticalPosition:'top'
            })
            this.preguntas= this.preguntas.filter((pregunta:any) => pregunta.preguntaId != preguntaId);
          },
          (error) => {
            this.snack.open('Error al eliminar la pregunta','',{
              duration:2000,
              verticalPosition:'top'
            })
            console.log(error);
          })
      }
    });
  }

}
