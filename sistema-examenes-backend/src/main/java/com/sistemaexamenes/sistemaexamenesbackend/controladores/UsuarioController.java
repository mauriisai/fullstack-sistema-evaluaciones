package com.sistemaexamenes.sistemaexamenesbackend.controladores;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Rol;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.UsuarioRol;
import com.sistemaexamenes.sistemaexamenesbackend.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) throws Exception {
        usuario.setPerfil("default.png");

        usuario.setPassword(this.bCryptPasswordEncoder.encode(usuario.getPassword()));

        Set<UsuarioRol> roles = new HashSet<>();

        // Asignacion del rol al nuevo registro.
        Rol rol = new Rol();
        rol.setId(2l);
        rol.setNombre("NORMAL");

        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(rol);

        // Agregando la relacion UsuarioRol al Set "roles"
        roles.add(usuarioRol);

        return usuarioService.guardarUsuario(usuario, roles);
    }

    @GetMapping("/{username}")
    public Usuario obtenerUsuario(@PathVariable("username") String username) {
        return usuarioService.obtenerUsuario(username);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable("id") Long id) {
        usuarioService.eliminarUsuario(id);
    }

}
