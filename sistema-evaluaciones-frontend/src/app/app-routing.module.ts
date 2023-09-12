import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './components/admin/view-categorias/view-categorias.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { AddCategoriaComponent } from './components/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './components/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './components/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './components/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './components/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './components/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './components/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './components/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './components/user/instrucciones/instrucciones.component';
import { StartComponent } from './components/user/start/start.component';

const routes: Routes = [
  { path:'signup', component:SignupComponent, pathMatch:'full' },
  {path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent,pathMatch:'full' },

  // Routing para el perfil de ADMIN
  { path:'admin', component:DashboardComponent,
    canActivate:[AdminGuard], 
    children:[
      { path:'profile', component:ProfileComponent },
      { path:'', component:WelcomeComponent },
      { path:'categorias', component:ViewCategoriasComponent },
      { path:'add-categoria', component:AddCategoriaComponent },
      { path:'examenes', component:ViewExamenesComponent },
      { path:'add-examen', component:AddExamenComponent },
      { path:'examen/:examenId', component:ActualizarExamenComponent },
      { path:'ver-preguntas/:examenId/:titulo', component:ViewExamenPreguntasComponent },
      { path:'add-pregunta/:examenId/:titulo', component:AddPreguntaComponent },
      { path:'pregunta/:preguntaId', component:ActualizarPreguntaComponent },      
    ]},

  // Routing para el perfil de USER
  { path:'user-dashboard', component:UserDashboardComponent, 
    canActivate:[NormalGuard], children:[ 
      { path:'profile', component:ProfileComponent },
      { path:':catId', component:LoadExamenComponent },
      { path:'instrucciones/:examenId', component:InstruccionesComponent },
      
    ]},

    { path:'start/:examenId', component:StartComponent, canActivate: [NormalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
