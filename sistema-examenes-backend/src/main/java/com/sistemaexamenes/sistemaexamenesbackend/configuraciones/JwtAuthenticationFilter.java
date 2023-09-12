package com.sistemaexamenes.sistemaexamenesbackend.configuraciones;

import com.sistemaexamenes.sistemaexamenesbackend.servicios.Implement.UserDetailsServiceImp;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    @Autowired
    private TokenService tokenService;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Obt. el token del Header del Request
        var authHeader = request.getHeader("Authorization");


        // Validando si el token no es null.
        if(authHeader != null ) {
            // Reemplazamos el auth header.
            var token = authHeader.replace("Bearer ", "");
            System.out.println(token);
            var subject = tokenService.getSubject(token);
            // Validamos si el subject no es null.
            if (subject != null) {
                //Asociar el token valido al usuario y poder hacer el llamado al metodo para iniciar session.
                System.out.println(tokenService.getSubject(token));
                var usuario = userDetailsServiceImp.loadUserByUsername(subject);
                var authentication = new UsernamePasswordAuthenticationToken(usuario,
                        null,usuario.getAuthorities());     // ->Forzamos un inicio de session.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}
