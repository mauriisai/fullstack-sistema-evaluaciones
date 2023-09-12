package com.sistemaexamenes.sistemaexamenesbackend.repositorios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Examen;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PreguntaRepository extends JpaRepository<Pregunta,Long> {

    Set<Pregunta> findByExamen(Examen examen);
}
