package com.sistemaexamenes.sistemaexamenesbackend.servicios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Examen;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Pregunta;

import java.util.Set;

public interface PreguntaService {

    Pregunta agregarPregunta(Pregunta pregunta);

    Pregunta actualizarPregunta(Pregunta pregunta);

    Set<Pregunta> obtenerPreguntas();

    Pregunta obtenerPregunta(Long preguntaId);

    Set<Pregunta> obtenerPreguntasDelExamen(Examen examen);

    void eliminarPregunta(Long preguntaId);

    Pregunta listarPregunta(Long preguntaId);

    
}
