package com.sistemaexamenes.sistemaexamenesbackend.repositorios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
}
