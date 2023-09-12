package com.sistemaexamenes.sistemaexamenesbackend.controladores;

import com.sistemaexamenes.sistemaexamenesbackend.entidades.Examen;
import com.sistemaexamenes.sistemaexamenesbackend.entidades.Pregunta;
import com.sistemaexamenes.sistemaexamenesbackend.servicios.ExamenService;
import com.sistemaexamenes.sistemaexamenesbackend.servicios.PreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/pregunta")
@CrossOrigin("*")
public class PreguntaController {

    @Autowired
    private PreguntaService preguntaService;

    @Autowired
    private ExamenService examenService;

    @PostMapping("/")
    public ResponseEntity<Pregunta> guardarPregunta(@RequestBody Pregunta pregunta) {

        return ResponseEntity.ok(preguntaService.agregarPregunta(pregunta));
    }

    @GetMapping("/examen/{examenId}")
    public ResponseEntity<?> listarPreguntasDelExamen(@PathVariable("examenId") Long examenId) {
        Examen examen = examenService.obtenerExamen(examenId);
        Set<Pregunta> preguntas = examen.getPreguntas();

        List examenes = new ArrayList<>(preguntas);
        if(examenes.size() > Integer.parseInt(examen.getNumeroDePreguntas())) {
            examenes = examenes.subList(0, Integer.parseInt(examen.getNumeroDePreguntas()+1));
        }

        Collections.shuffle(examenes);
        return ResponseEntity.ok(examenes);
    }

    @PutMapping("/")
    public ResponseEntity<Pregunta> actualizarPregunta(@RequestBody Pregunta pregunta) {
        return ResponseEntity.ok(preguntaService.actualizarPregunta(pregunta));
    }

    @GetMapping("/{preguntaId}")
    public Pregunta listarPreguntaPorId(@PathVariable("preguntaId") Long preguntaId) {
        return preguntaService.obtenerPregunta(preguntaId);

    }

    @DeleteMapping("/{preguntaId}")
    public void eliminarPregunta(@PathVariable("preguntaId") Long preguntaId) {
        preguntaService.eliminarPregunta(preguntaId);
    }

    @GetMapping("examen/todos/{examenId}")
    public ResponseEntity<?> listarPreguntasDelExamenComoAdministrador(@PathVariable("examenId") Long examenId) {
        Examen examen = new Examen();
        examen.setId(examenId);
        Set<Pregunta> preguntas = preguntaService.obtenerPreguntasDelExamen(examen);
        return ResponseEntity.ok(preguntas);
    }

    @PostMapping("/evaluar-examen")
    public ResponseEntity<?> evaluarExamen(@RequestBody List<Pregunta> preguntas) {
        double puntosMaximos =0;
        Integer respuestasCorrectas=0;
        Integer intentos=0;

        for (Pregunta p: preguntas) {
            Pregunta pregunta = this.preguntaService.listarPregunta(p.getPreguntaId());
            if(pregunta.getRespuesta().equals(p.getSeleccion())){
                respuestasCorrectas ++;
                double puntos= Double.parseDouble(preguntas.get(0).getExamen().getPuntosMaximos())/preguntas.size();
                puntosMaximos += puntos;
            }
            if(p.getSeleccion() != null){
                intentos ++;
            }
        }
        Map<String,Object> respuestas = new HashMap<>();
        respuestas.put("puntosMaximos", puntosMaximos);
        respuestas.put("respuestasCorrectas",respuestasCorrectas);
        respuestas.put("intentos", intentos);

        return ResponseEntity.ok(respuestas);
    }
}
