package com.sistemaexamenes.sistemaexamenesbackend.servicios.Implement;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.UsuarioRol;
import com.sistemaexamenes.sistemaexamenesbackend.repositorios.RolRepository;
import com.sistemaexamenes.sistemaexamenesbackend.repositorios.UsuarioRepository;
import com.sistemaexamenes.sistemaexamenesbackend.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception{
        Usuario usuarioLocal =  usuarioRepository.findByUsername(usuario.getUsername());
        if (usuarioLocal != null) {
            throw new Exception("El usuario ya exist");
        }
        else {
            for (UsuarioRol usuarioRol: usuarioRoles){
                rolRepository.save(usuarioRol.getRol());
            }
            usuario.getUsuarioRoles().addAll(usuarioRoles);
            usuarioLocal=usuarioRepository.save(usuario);
        }
        return usuarioLocal;
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario obtenerUsuario(String username) {
        return usuarioRepository.findByUsername(username);
    }
}
