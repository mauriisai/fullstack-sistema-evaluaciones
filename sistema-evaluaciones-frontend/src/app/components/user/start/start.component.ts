import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  examenId:any;
  preguntas:any;
  
  puntosConseguidos =0;
  respuestasCorrectas=0;
  intentos=0;
  notaFinal=0;
  
  timer:any;

  esEnviado=false;

  constructor(private locationSt:LocationStrategy, private preguntaService:PreguntaService,
    private route:ActivatedRoute, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId=this.route.snapshot.params['examenId'];
    this.cargarPreguntas();
  }

  public prevenirElBotonDeRetroceso(){
    history.pushState(null, null!,location.href);
    this.locationSt.onPopState(() =>{
      history.pushState(null, null!,location.href);
    })
  }

  public cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data)=> {
        console.log(data);
        this.preguntas =data;

        this.timer = this.preguntas.length*2 *60;
        this.preguntas.forEach((p:any) => {
        });
        this.iniciarTemporizador();
      },(error) =>{
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la Prueba', 'error');
      })
  }

  public evaluarExamen(){
    // ------ TRABAJANDO DESDE EL FRONTEND ------ 
    this.preguntaService.evaluarExamen(this.preguntas).subscribe( 
      (data:any) => {
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.esEnviado= true;
        this.notaFinal = Number((10 * this.puntosConseguidos / this.preguntas[0].examen.puntosMaximos).toFixed(2));
      }, (error) => {
        console.log(error);
      });

    /* ------ TRABAJANDO DESDE EL FRONTEND ------
    this.esEnviado = true;
    this.preguntas.forEach( (p:any) => {
      if( p.seleccion == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;        
        this.notaFinal = Number((10 * this.puntosConseguidos / this.preguntas[0].examen.puntosMaximos).toFixed(2));

      }
      if(p.seleccion.trim() != '') {
        this.intentos ++;
      }
    })
    console.log("Respuestas correctas:" +this.respuestasCorrectas);
    console.log("Puntos conseguidos:" +this.puntosConseguidos); */
  }

  public enviarCuestionario(){
    Swal.fire({
      title:'Enviar solucion',
      text:'Estas seguro que quieres enviar el examen?',
      icon:'info',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      confirmButtonText:'Enviar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      
      if(resultado.isConfirmed){
        this.evaluarExamen();
      }
    });
  }

  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if(this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      }
      else {
        this.timer --;
      }
    },1000)
  }
  
  obtenerHoraFormateada() {
    let mm =Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} min : ${ss}  seg`; 
  }

  public imprimirPagina() {
    window.print();
  }
}
