import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/role'
import Dependencia from '../models/dependencia'
import TipoDependencia from '../models/tipoDependencia'
import personaCargo from '../models/personacargo'
import Tabla from '../models/tabla'
import Fabricante from '../models/fabricante'
import Disco from '../models/discoduro'
import Procesador from '../models/procesador'
import Refimp from '../models/refimpresora'
import Referencia from '../models/referencia'

//controlador para manejar todo lo referente a token y usuarios


//método para ingresar una vez se tiene cuenta
export const signIn = async (req, res) => {
    //con esto se obtiene los datos completos del rol y la dependencia usando sus objectId
    const userFound = await User.findOne({ email: req.body.email }).populate(['roles'])
    //si el usuario no existe se envía un mensaje de error
    if (!userFound) {
        return res.status(400).json({ message: "El usuario no existe" })
    }
    //si el usuario existe se valida que la contraseña ingresada coincida con la registrada en la base de datos

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    //si la contraseña no coincide se envía un mensaje de contraseña inválida
    if (!matchPassword) {
        return res.status(401).json({ token: 'null', message: 'Contraseña Inválida' })

    }
    //si el usuario existe y la contraseña coincide se retorna el token

    const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: 1800 })
    //se envía el rol, el id del usuario y el token para luego ser gestionados desde el frontend
    res.json({
        roles: userFound.roles[0].toJSON().name,
        id: userFound._id,
        token
    })
}

export const crearFabricante = async (req, res) => {
    let fabricante = await Fabricante.findOne({ name: req.body.name });

    if (fabricante) {
        res.status(500).json("El fabricante ya existe")
    }
    else {
        const newFab = new Fabricante({ name: req.body.name })
        const savedFab = await newFab.save();
        //se retorna el estado 200 si el registro fue exitoso
        res.status(200).json({ savedFab })
    }
}

export const crearDisco = async (req, res) => {
    let disco = await Disco.findOne({ name: req.body.name });

    if (disco) {
        res.status(500).json("El tipo de disco ya existe")
    }
    else {
        const newDis = new Disco({ name: req.body.name })
        const savedDis = await newDis.save();
        //se retorna el estado 200 si el registro fue exitoso
        res.status(200).json({ savedDis })
    }
}

export const crearProcesador = async (req, res) => {
    let procesador = await Procesador.findOne({ name: req.body.name });

    if (procesador) {
        res.status(500).json("El tipo de procesador ya existe")
    }
    else {
        const newPro = new Procesador({ name: req.body.name })
        const savedPro = await newPro.save();
        //se retorna el estado 200 si el registro fue exitoso
        res.status(200).json({ savedPro })
    }
}

export const crearRefimp = async (req, res) => {
    let refimp = await Refimp.findOne({ name: req.body.name });
    console.log("refimp",refimp)

    if (refimp) {
        res.status(500).json("El tipo de impresora ya existe")
    }
    else {
        const newRefimp = new Refimp({ name: req.body.name })
        const savedRefimp = await newRefimp.save();
        //se retorna el estado 200 si el registro fue exitoso
        res.status(200).json({ savedRefimp })
    }
}

export const crearReferencia = async (req, res) => {
    let referencia = await Referencia.findOne({ name: req.body.name });

    if (referencia) {
        res.status(500).json("La referencia de PC ya existe")
    }
    else {
        const newRef = new Referencia({ name: req.body.name })
        const savedRef = await newRef.save();
        //se retorna el estado 200 si el registro fue exitoso
        res.status(200).json({ savedRef })
    }
}


export const crearTabla = async (req, res) => {
    const { name, equipos } = req.body
    newTable = new Tabla({ name })

    if (equipos.lenght > 0) {
        const foundequipo = await Role.find({ qr: { $in: equipos } })
        //en caso de existir se guarda el ObjectId del rol
        newUser.roles = foundRoles.map(role => role._id)
        newTable.equipos = equipos
    }
    let tablita = await Tabla.findOne({ name: req.body.name }).populate(['roles', 'dependencia'])
    const savedTable = await newTable.save();
    //se retorna el estado 200 si el registro fue exitoso
    res.status(200).json({ savedTable })
}

export const removeTabla = async (req, res) => {
    try {
        //Se busca la tabla y se la elimina
        const tabla = await Tabla.findByIdAndDelete(req.params.id)
        console.log("tabla eliminada");
        return res.status(200).json(true)
    }
    catch (error) {
        return res.status(400).json(false)
    }
}
//método para crear un nuevo espacio, esto solo lo puede hacer un Super Administrador
export const crearDependencia = async (req, res) => {
    //se desestructuran los datos enviados por el usuario, para obtener los parámetros necesarios

    const { id_unidad, nombre_unidad, tipo_unidad } = req.body;
    //se crea un nuevo espacio
    const newDependencia = new Dependencia({
        id_unidad,
        nombre_unidad
    })
    //se busca el tipo de espacio en la base de datos
    if (tipo_unidad) {
        const foundTipo = await TipoDependencia.find({ name: { $in: tipo_unidad } });
        //se obtiene el objectId del tipo de espacio
        let tipo = foundTipo[0].toJSON()._id
        //se asigna la nueva variable al objeto
        newDependencia.tipo_unidad = tipo;
    }
    //si todos los datos son correctos, se envía el objeto a la base de datos y se solicita guardarlo
    const savedDep = await newDependencia.save();
    //se retorna el estado 200 si el registro fue exitoso
    res.status(200).json({ savedDep })
}

//método para obtener la lista de dependencias almacenadas en la base de datos
export const dependencias = function (req, res) {
    //variable que guarda todas las dependencias
    let dependencias = Dependencia.find({});
    //en caso de haber error en la consulta se lanza error
    dependencias.exec(function (err, dependencias) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener las dependencias',
                error: err
            });
        }
        //se retorna estatus 200 si no existe error y se envía la lista de dependencias
        return res.status(200).json(dependencias);
    });
};

export const personasCargo = function (req, res) {
    let personas = personaCargo.find({});
    personas.exec(function (err, personas) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener las personas a cargo',
                error: err
            })
        }
        return res.status(200).json(personas);
    }
    )
}

//método para obtener el usuario
export const getUser = async (req, res) => {
    //se busca el usuario en la base de datos por medio de la cédula
    const user = User.findOne({ _id: req.params.id });
    //en caso de error en la consulta se envía un estatus 500
    user.exec((err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener el user',
            });
        }
        //si no hay error se envía el usuario y estatus 200

        return res.status(200).json(user);
    });
}

//Método para obtener los tipos de espacios físicos
export const tipoDependencias = function (req, res) {
    //variable que almacena la lista de todo los tipos de espacios
    let tiposdependencias = TipoDependencia.find({});
    //en caso de existir error al traer los espacios se envía un status de error
    tiposdependencias.exec(function (err, tiposdependencias) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los tipos de espacios físicos',
                error: err
            });
        }
        //si no existe error al traer los tipos de espacios se envía un estatus 200 y los nombres de los espacios físicos
        return res.status(200).json(tiposdependencias.map(r => {
            return r.name
        }));
    });
};

export const changePassword = async (req, res) => {
    try {
        console.log("entré back")
        const user = await User.findOne({ email: req.body.email })
        const passwordn = await User.encryptPassword(req.body.password);
        console.log(user, '-', passwordn)
        const userPass = await User.findByIdAndUpdate({ _id: user.id }, { password: passwordn }, { new: true });
        return res.status(200).json("Contraseña cambiada")
    }
    catch (error) {
        // error 200 tiene que ser 400 pero si da error no manda el mensaje
        return res.status(200).json({message: "Error"}) 
    }
}

//Método para obtener los roles
export const roles = function (req, res) {
    //variable que almacena todos los roles
    let rolel = Role.find({});
    //si la variable está vacía se envía un error
    rolel.exec(function (err, rolel) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los roles',
                error: err
            });
        }
        //si no hubo error en obtener los roles se envía la lista

        return res.status(200).json(rolel);
    });
};

//Método para registrar un usuario, es diferente del método signup porque no se envía token ya que un Administrador lo ejecuta
export const registrarUsuario = async (req, res) => {
    //se desestructuran los datos para obtener los parámetros necesarios

    const { name, ced, roles, email, password, telefono } = req.body;
    //se crea un nuevo usuario
    const newUser = new User({
        name,
        ced,
        email,
        password: await User.encryptPassword(password),
        telefono
    })
    //se valida si el rol diferente a USER existe
    if (roles) {
        //se busca el rol enviado entre los roles existentes
        const foundRoles = await Role.find({ name: { $in: roles } })
        //en caso de existir se guarda el ObjectId del rol
        newUser.roles = foundRoles.map(role => role._id)
    }
    //de lo contrario se envía el parámetro USER
    else {
        const role = await Role.findOne({ name: "USER" })
        newUser.roles = [role._id]
    }

    //se envía el usuario a la base de datos
    const savedUser = await newUser.save();
    //se envía el nombre del rol y el estatus 200
    res.status(200).json({ roles: savedUser.roles[0].toJSON().name })
}

export const fabricantes = function (req, res) {
    //variable que almacena todos los fabricantes
    let fabs = Fabricante.find({});
    //si la variable está vacía se envía un error
    fabs.exec(function (err, fabs) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los fabricantes',
                error: err
            });
        }
        return res.status(200).json(fabs);
    });
};

export const discosduro = function (req, res) {
    //variable que almacena todos los fabricantes
    let disks = Disco.find({});
    //si la variable está vacía se envía un error
    disks.exec(function (err, disks) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los discos',
                error: err
            });
        }
        return res.status(200).json(disks);
    });
};

export const procesadores = function (req, res) {
    //variable que almacena todos los fabricantes
    let proces = Procesador.find({});
    //si la variable está vacía se envía un error
    proces.exec(function (err, proces) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los procesadores',
                error: err
            });
        }
        return res.status(200).json(proces);
    });
};

export const refsimp = function (req, res) {
    //variable que almacena todos los fabricantes
    let refimp = Refimp.find({});
    //si la variable está vacía se envía un error
    refimp.exec(function (err, refimp) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los referencias de impresoras',
                error: err
            });
        }
        return res.status(200).json(refimp);
    });
};

export const refspc = function (req, res) {
    //variable que almacena todos los fabricantes
    let refpc = Referencia.find({});
    //si la variable está vacía se envía un error
    refpc.exec(function (err, refpc) {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los referencias de pc',
                error: err
            });
        }
        return res.status(200).json(refpc);
    });
};