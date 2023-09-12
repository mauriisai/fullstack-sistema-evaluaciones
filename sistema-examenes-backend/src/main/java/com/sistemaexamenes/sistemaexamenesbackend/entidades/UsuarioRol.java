package com.sistemaexamenes.sistemaexamenesbackend.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class UsuarioRol {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long usuarioRolId;

    @ManyToOne(fetch=FetchType.EAGER)
    private Usuario usuario;

    @ManyToOne
    private Rol rol;

}
