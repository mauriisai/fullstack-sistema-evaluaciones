package com.sistemaexamenes.sistemaexamenesbackend.configuraciones;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.secret}")
    private String apiSecret;

    // Metodo para generar un Token JWT usando la lib auth0-JWT descargada de 'jwt.io' el codigo
    // ha sido extraido de la documentacion en Github realizando pequeñas mdificaciones.
    public String generarToken(Usuario usuario) {
        try{
            // Es mala practica tener 'secrets' hardcodeados porque no deberian ser compartido en ninguna parte del codigo.
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("evaluacion")
                    // Haciendo dinamico el JWTtoken para que varios usuarios puedan loguearse.
                    .withSubject(usuario.getUsername())
                    // Devolviendo el Id del cliente para que la app cliente conozca el usuario por regla de negocio.
                    .withClaim("id", usuario.getId())
                    // Seteando el periodo de Expiracion del Token.
                    .withExpiresAt(generarFechaExpiraciion())
                    .sign(algorithm);

        }catch  (JWTCreationException exception){
            throw new RuntimeException();
        }
    }

    public String getSubject(String token) {
        if (token == null){
            throw new RuntimeException();
        }
        DecodedJWT verifier = null;
        try {   // Validando firma del token.
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            verifier = JWT.require(algorithm)
                    // Especificar validaciones a un claim especifico
                    .withIssuer("evaluacion")
                    .build().verify(token);
            verifier.getSubject();

        } catch (JWTCreationException exception) {
            System.out.println(exception.toString());
        }

        if(verifier.getSubject() == null) {
            throw new RuntimeException("verifier invalido");
        }else{
            return verifier.getSubject();
        }
    }

    // Metodo para establecer FechaDeExpiracion al Token en este caso 2 horas.
    private Instant generarFechaExpiraciion(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));
    }
}
