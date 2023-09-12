import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  examenes: any = [ ]

  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (dato: any) => {
        this.examenes = dato;
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los cuestionarios', 'error');
      }
    )
  }

  eliminarExamen(id:any) {
    Swal.fire({
      title: 'Eliminar examen',
      text: 'Estas seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminarExamen(id).subscribe(
          (data) => {
            this.examenes = this.examenes.filter((examen:any) => examen.id != id);
          Swal.fire('Examen Eliminado', 'Examen eliminado con Exito', 'success');
        },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error al eliminar el registro', 'error')
          }
        )
      };
    })
  }
  
}
