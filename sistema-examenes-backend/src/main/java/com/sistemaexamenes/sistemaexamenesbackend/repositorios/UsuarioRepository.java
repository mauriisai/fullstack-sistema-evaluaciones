package com.sistemaexamenes.sistemaexamenesbackend.repositorios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    public Usuario findByUsername(String username);
}
