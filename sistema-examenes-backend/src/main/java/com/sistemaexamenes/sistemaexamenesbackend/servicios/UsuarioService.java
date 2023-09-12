package com.sistemaexamenes.sistemaexamenesbackend.servicios;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.UsuarioRol;

import java.util.Set;

public interface UsuarioService {
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;
    public void eliminarUsuario(Long usuarioId);
    public Usuario obtenerUsuario(String username);



}
