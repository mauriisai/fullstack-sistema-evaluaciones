import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit{
  
  titulo:any;
  examenId:any;
  pregunta:any={
    examen:{},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta: ''
  }

  constructor(private route:ActivatedRoute, private preguntaService:PreguntaService){ }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo=this.route.snapshot.params['titulo'];
    this.pregunta.examen['id']= this.examenId;
  }

  public almacenarPregunta(){
    if(this.pregunta.contenido.trim() == '' || this.pregunta.contenido == null){
      return;      
    }
    if(this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null){
      return;
    }
    if(this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null){
      return;
    }
    if(this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null){
      return;
    }
    if(this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null){
      return;
    }
    
    if(this.pregunta.respuesta.trim() == '' || this.pregunta.respuesta == null){
      return;
    }
    
    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      (data) => {
      console.log(this.pregunta);
      Swal.fire('Pregunta Almacenada','Pregunta almacenada con exito','success');
      this.pregunta.contenido = '';
      this.pregunta.opcion1 = '';
      this.pregunta.opcion2 = '';
      this.pregunta.opcion3 = '';
      this.pregunta.opcion4 = '';
      this.pregunta.respuesta='';
      
    }, (error) => {
      Swal.fire('Error','Error al almacenar la pregunta','error');
      console.log(error);
    })
  }

}
