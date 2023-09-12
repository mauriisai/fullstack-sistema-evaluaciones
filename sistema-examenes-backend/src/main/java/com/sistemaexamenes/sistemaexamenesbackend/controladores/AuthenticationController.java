package com.sistemaexamenes.sistemaexamenesbackend.controladores;

import com.sistemaexamenes.sistemaexamenesbackend.configuraciones.TokenService;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.DatosAutenticacionUsuario;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.JwtResponse;
import com.sistemaexamenes.sistemaexamenesbackend.servicios.Implement.UserDetailsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/* Creamos el RestController para el login de la app.
USUARIO DE PRUEBA:
{
	"username": "mariav",
	"password": "0000"
}   */
@RestController
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/generate-token")
    public ResponseEntity autenticarUsuario(@RequestBody @Validated DatosAutenticacionUsuario datosAutenticacionUsuario) {

        // Generamos un token con el Metodo en mencion.
        Authentication authToken = new UsernamePasswordAuthenticationToken(datosAutenticacionUsuario.username(),
                datosAutenticacionUsuario.password());

        // Declaramos en una variable el user Autenticado.
        var usuarioAutenticado = authenticationManager.authenticate(authToken);

        // Retornamos el token.
        if (usuarioAutenticado != null) {
            var JWTtoken = tokenService.generarToken((Usuario) usuarioAutenticado.getPrincipal());
            System.out.println(JWTtoken);
            return ResponseEntity.ok(new JwtResponse(JWTtoken));
        } else {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        }

    }

    @GetMapping("/actual-usuario")
    public Usuario obtenerUsuarioActual(Principal principal) {
        return (Usuario) this.userDetailsServiceImp.loadUserByUsername(principal.getName());
    }

}