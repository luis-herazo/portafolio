
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();
const verificarToken = require("./middleware/verificarToken");

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.use(express.json());
app.use(cors());

app.post("/api/login", async(req, res) =>{
    try {
        const {email, password} = req.body;

        const {data : usuario, error: errFind} = 
            await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        console.log(usuario)
        if(errFind || !usuario) return res.status(400).json({
            error: "Usuario o contraseña incorrecta"
        });

        const esValido = await bcrypt.compare(password, usuario.password)

        if (!esValido) return res.status(400).json({
            error: "Usuario o contraseña incorrecta"
        });

        const token = jwt.sign({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn : "1h"}
        );

        res.json({
            mensaje: "Bienvenido",
            token: token
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Error desconocido, lo siento.."
        })
        
    }
})

app.post("/api/registro", async (req, res) =>{
    try {
        const { nombre, email, password } = req.body;
        // const { data, error } = supabase.from('proyectos')
        // .select('*');

        const {data : usuario} = await supabase
        .from('usuarios').select('*')
        .eq('email', email)
        // .single()
        
        console.log(usuario);
        
        if(usuario){
            return res.status(400).json({error: "Usuario ya existe con ese email"})
        }
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);
        const { error } = await supabase.from('usuarios').insert([
            {
                nombre, 
                email, 
                password: passwordEncriptada
            }
        ])

        if(error) throw error;
        res.status(201).json({
            mensaje: "Usuario registrado con éxito."
        })
    } catch (error) {
        res.status(500).json({
            error: "UPSSS, Error en el servidor..."
        })
    }
});

app.get("/", (req, res) =>{
    res.send("Bienvenidos a mi primer API!");
});

app.get("/saludo", verificarToken, async (req, res)=>{
    
    const nombre = req.user.nombre;
    // console.log(req)
    res.send({
        Saludo : `Hola ${nombre}`
    })
})

app.get("/api/proyectos", async (req, res) =>{
    try{
        const {data, error} = await supabase
        .from('proyectos').select('*');

        if (error) throw error;
        res.status(200).json(data)

    }catch(error){
        res.status(400).json({
            error : "Faltan datos o formato incorrecto"
        });
    }
});

app.get("/api/proyectos/:id", async (req, res) =>{
    try{
        const {data, error} = await supabase
        .from('proyectos')
        .select('*')
        .eq('id', req.params.id)
        .single();

        if (error) throw error;
        res.status(200).json(data)

    }catch(error){
        res.status(400).json({
            error : "Faltan datos o formato incorrecto"
        });
    }
});

app.delete("/api/proyectos/:id", async (req, res) =>{
    try{
        const {data, error} = await supabase
        .from('proyectos')
        .delete()
        .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({mensaje : "Proyecto borrado exitosamente"});

    }catch(error){
        res.status(400).json({
            error : "Faltan datos o formato incorrecto"
        });
    }
});

app.post("/api/proyectos/create", verificarToken, async (req, resp) =>{
    try {
        const {data, error} = await supabase
            .from('proyectos')
            .insert([req.body])
            .select();

        if (error) throw error;
        resp.status(201).json(data[0])
        
    } catch (error) {
        console.error("DEBUG: Supabase insert failed:", error);

        resp.status(400).json({
            error: "Fallo al insertar el registro",
            Mensaje: error
        }) 
    }
})

app.put("/api/proyectos/:id", async (req, resp) =>{
    try {
        const {data, error} = await supabase
            .from('proyectos')
            .update([req.body])
            .eq('id', req.params.id)
            .select();

        if (error) throw error;
        console.log(data)
        resp.status(200).json(data[0])
        
    } catch (error) {

        resp.status(400).json({
            error: "Fallo al insertar el registro",
            Mensaje: error
        }) 
    }
})



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo... en http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Error: El puerto ${PORT} ya está en uso.`);
    } else {
        console.error("Error al iniciar el servidor:", err);
    }
});