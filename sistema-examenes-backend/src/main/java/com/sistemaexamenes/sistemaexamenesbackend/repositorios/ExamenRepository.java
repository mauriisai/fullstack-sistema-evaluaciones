package com.sistemaexamenes.sistemaexamenesbackend.repositorios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Categoria;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Examen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamenRepository extends JpaRepository<Examen,Long> {

    List<Examen> findByCategoria(Categoria categoria);

    List<Examen> findByActivo(Boolean estado);

    List<Examen> findByCategoriaAndActivo(Categoria categoria, Boolean estado);
}
