package com.sistemaexamenes.sistemaexamenesbackend.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "preguntas")

public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preguntaId;

    @Column(length=2000)
    private String contenido;

    private String imagen;

    private String opcion1;
    private String opcion2;
    private String opcion3;
    private String opcion4;

    private String respuesta;

    @Transient
    private String seleccion;

    @ManyToOne(fetch = FetchType.EAGER)
    private Examen examen;

}
