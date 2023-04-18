import equipo from '../models/equipo' ;

//método para traer todos los equipos
export const crearEquipo = async (req, res) => {
    const { qr, fabricante, referencia, disco_duro, ram, procesador, a_cargo, impqr, impref, impa_cargo, observaciones } = req.body
    const newEquipo = new equipo({
        qr,
        fabricante,
        referencia,
        disco_duro,
        ram,
        procesador,
        impqr,
        impref,
        observaciones
    })
    if (a_cargo) {
        const foundPerson = await personaCargo.find({ ced: { $in: a_cargo } })
        if (foundPerson) {
            newEquipo.a_cargo = foundPerson[0].toJSON()._id
        }
    }
    if (impa_cargo) {
        const foundPers = await personaCargo.find({ ced: { $in: impa_cargo } })
        if (foundPers) {
            newEquipo.impa_cargo = foundPers[0].toJSON()._id
        }
    }
    const savedEquip = await newEquipo.save();
    //se retorna el estado 200 si el registro fue exitoso
    res.status(200).json({ savedEquip })
}

export const removeEquipo = async (req, res) => {
    try {
        //Se busca el equipo y se lo elimina
        const eqp = await equipo.findByIdAndDelete(req.params.id);
        console.log("equipo borrado")
        return res.status(200).json(true)
    }
    catch (error) {
        return console.log(error)
    }
}

export const updateEquipo = async (req, res) => {
    //se busca el equipo y se actualiza cualquier campo
    const eqpb = await equipo.findById(req.params.id)

    const eqp = await equipo.findByIdAndUpdate(req.params.id, {
        qr: eqpb.qr,
        fabricante: req.body.fabricante,
        referencia: req.body.referencia,
        disco_duro: req.body.disco_duro,
        ram: req.body.ram,
        procesador: req.body.procesador,
        impqr: eqpb.impqr,
        impref: req.body.impref,
        impa_cargo: eqpb.impa_cargo,
        a_cargo: eqpb.a_cargo,
        observaciones:req.body.observaciones
    },
        { new: true })
    return res.status(201).json({ message: "Equipo actualizado" })
}

export const GetEquipos=async(req,res)=>{
    const eqps = await equipo.findOne({qr:req.body.id}).populate('a_cargo').populate('impa_cargo')
    return res.status(200).json(eqps)
}
