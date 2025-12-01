
// CREAR TAREAS
//     NO DEBE PERMITIR QUE DOS TAREAS TENGAN EL MISMO NOMBRE
// MODIFICAR UNA TAREA POR EL nombre
// BORRAR UNA TAREA, SI NO EXISTE LA TAREA DEBEN RESPONDER 404
// LISTAR TODAS LAS TAREAS
// LISTAR UNA TAREA POR NOMBRE
// CAMIBAR EL ESTADO DE UNA TAREA  
// LISTAR POR ESTADO
// Descripción del ejercicio:
// Vas a crear una pequeña API de gestión de tareas ("to-do list") en la cual puedas:
// 1. Obtener una lista de tareas.
// 2. Obtener una tarea por nombre
// 3. Obtener listado tareas pendientes
// 4. Obtener listado tareas completadas
// 5. Agregar una nueva tarea.
// 6. Actualizar una tarea existente.
// 7. Actualizar el estado de una tarea
// 8. Eliminar una tarea especifica

// Instrucciones:
// 1. Crea un proyecto de Node.js con Express.
// 2. Implementa las rutas (endpoints) correspondientes para las peticiones HTTP.
// 3. Usa un arreglo en memoria para almacenar las tareas (no es necesario conectarse a
// una base de datos).
// Ejemplo Lista:
// [{
// "tarea":"Aprender Javascript",
// "estado":"PENDIENTE",
// },


import express from 'express'

const app = express()

app.use(express.json())



let notas = [
        {
            nombre: "js",
            descripcion: "Aprender JS",
            Estado: "",
            pasos: "",
            cc:"1101683593",
        },
         {
            nombre: "php",
            descripcion: "Aprender JS",
            Estado: "",
            pasos: "",
            cc:"1101683500",
        },
         
    ];

    //Obtener notas dependien
app.get('/', (req, res) => {

    let pendiente = [];
    let completadotask = [];

    notas.forEach(nota => {
        if (nota.Estado === "PENDIENTE") {
            pendiente.push(nota);
        } else if (nota.Estado === "COMPLETADO") {
            completadotask.push(nota);
        }
    });

    res.json({
        pendientes: pendiente,
        completadas: completadotask
    });
});

       
    // Simplemente responde con el array notas
    // res.json(notas);



// app.get('/pasos', (req,res)=>{

// if(!nuevanota.pasos.length<4){
// return req.json
// }else{
// res.status(400).json({error:"no existen notas con esas caracteristicas"})
// }

// })

app.get('/pasos', (req, res) => {
    // Filtrar notas donde el campo pasos tenga más de 4 caracteres
    const conPasos = notas.filter(nota => nota.pasos && nota.pasos.length > 4);

    if (conPasos.length === 0) {
        return res.status(400).json({ error: "No existen notas con esas características" });
    }

    res.json({ notas: conPasos });
});




// Simulación de base de datos en memoria

app.post('/', (req, res) => {
    const nuevanota = req.body;

    // Validar que tenga los campos correctos
    if (!nuevanota.nombre || !nuevanota.descripcion || !nuevanota.Estado) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Verificar si ya existe una nota con ese nombre
    const nombreExiste = notas.some(nota =>
        nota.nombre.toLowerCase() === nuevanota.nombre.toLowerCase()
    );

    if (nombreExiste) {
        return res.status(400).json({ msg: "Ya existe una nota con ese nombre" });
    }

    // Agregar nota
    notas.push(nuevanota);

    res.status(201).json(nuevanota);
});





// PUT para actualizar una nota, la buscamos por nombre original

app.put('/:nombre', (req, res) => {
    const nombreOriginal = req.params.nombre; // nombre que buscas
    const { nombre, descripcion, Estado } = req.body;

    const nota = notas.find(n => n.nombre === nombreOriginal);
    if (!nota) return res.status(404).json({ error: "Nota no encontrada" });

    if (nombre) nota.nombre = nombre;
    if (descripcion) nota.descripcion = descripcion;
    if (Estado) nota.Estado = Estado;

    res.json({ mensaje: "Nota actualizada", nota });
});

app.get('/notas', (req, res)=>{
    res.json(notas)
  
})



let usuarios = [
    {
        nombre: "Jefferson",
        apellido: "Rojas",
        Edad: 20,
        cc: "1101683593",
    },
    {
        nombre: "Ana",
        apellido: "Martínez",
        Edad: 16,
        cc: "1101683500",
    }
];

app.post('/postu', (req,res)=>{
const nuevousuario = req.body

if(!nuevousuario.nombre ||



 !nuevousuario.apellido || !nuevousuario.Edad || !nuevousuario.cc){
return res.status(400).json({error: "faltan campos"})
} 

const nuevoE = usuarios.some(usuario=>
usuario.nombre.toLocaleLowerCase() === nuevousuario.nombre.toLocaleLowerCase());

if(nuevoE){
return res.status(400).json({error: "ya existe"})
}

usuarios.push(nuevousuario)
    res.status(201).json(nuevousuario);
})


// Ruta: usuarios menores de edad (< 18)
app.get('/usuarios/menores', (req, res) => {
    let menoresEdad = [];

    usuarios.forEach(usuario => {
        usuario.Edad = parseInt(usuario.Edad); // Asegurar que Edad sea número

        if (usuario.Edad < 18) {
            menoresEdad.push(usuario);
        }
    });

    if (menoresEdad.length === 0) {
        return res.status(404).json({ msg: "No existen personas menores de 18" });
    }

    res.json(menoresEdad);
});

// Ruta: usuarios mayores o iguales a 18
app.get('/usuarios/mayores', (req, res) => {
    let mayoresEdad = [];

    usuarios.forEach(usuario => {
        usuario.Edad = parseInt(usuario.Edad); // Asegurar que Edad sea número

        if (usuario.Edad >= 18) {
            mayoresEdad.push(usuario);
        }
    });

    if (mayoresEdad.length === 0) {
        return res.status(404).json({ msg: "No existen personas mayores de edad" });
    }

    res.json(mayoresEdad);
});




app.post('/usuarios/:cc', (req, res) => {
    const cedula = req.params.cc;

    // Verificar si la cédula existe en usuarios
    const usuario = usuarios.find(u => u.cc === cedula);

  if (usuario === true) {
    const indice = notas.findIndex(nota => nota.nombre === nombre);

    if (indice !== -1) {
    
        console.log("La nota existe en la posición:", indice);
    } else {
        console.log("No existe una nota con ese nombre");
    }
    }
});

app.delete('/usuarios/:cc', (req, res) => {
  const cedula = req.params.cc;

  // Buscar el índice del usuario
  const index = usuarios.findIndex(u => u.cc === cedula);

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // Eliminar usuario
  const eliminada = usuarios.splice(index, 1);

  res.json({ msg: "Usuario eliminado", usuario: eliminada[0] });
});









app.listen(3000,()=>{
    console.log(`Servidor escuchando en el puerto 3000`);
})
