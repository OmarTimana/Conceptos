import { Types } from 'mongoose';
import equipo from '../models/equipo' ;
import personaCargo from '../models/personacargo'

//método para traer todos los equipos
export const crearEquipo = async (req, res) => {
    if (await equipo.findOne({_id:req.body._id})) {
        updateEquipo(req,res)
    }else{
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
}

export const updateEquipo = async (req, res) => {
    //se busca el equipo y se actualiza cualquier campo
    const eqpa=await equipo.findOne({_id:req.body._id}).populate('a_cargo').populate('impa_cargo')
    let a_cargo=eqpa.a_cargo
    let impa_cargo=''
    if (eqpa.impa_cargo) {impa_cargo=eqpa.impa_cargo.ced}
    if (req.body.a_cargo && req.body.a_cargo.length>0 && req.body.a_cargo!=a_cargo.ced) {
        const foundPerson = await personaCargo.findOne({ ced: { $in: req.body.a_cargo } })
        if (foundPerson) {
            a_cargo = foundPerson._id
        }else{
            return res.status(300).json({message:'Persona a Cargo no encontrado'})
        }
    }
    await equipo.findByIdAndUpdate(req.body._id, {
        fabricante: req.body.fabricante,
        referencia: req.body.referencia,
        disco_duro: req.body.disco_duro,
        ram: req.body.ram,
        procesador: req.body.procesador,
        a_cargo: a_cargo._id,
        observaciones:req.body.observaciones
    },
    { new: true })
    if (req.body.impa_cargo && req.body.impa_cargo.length>0) {
        console.log("cambia impa_cargo");
        const foundPers = await personaCargo.findOne({ ced: { $in: req.body.impa_cargo } })
        if (foundPers) {
            impa_cargo = foundPers._id
        }else{
            return res.status(300).json({message:'Persona a Cargo no encontrado'})
        }
        await equipo.findByIdAndUpdate(req.body._id, {
            impqr: req.body.impqr,
            impref: req.body.impref,
            impa_cargo: impa_cargo,
        },
        { new: true })
    }
    return res.status(201).json({ message: "Equipo actualizado" })
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

export const GetEquipos=async(req,res)=>{
    const eqp = await equipo.findOne({qr:req.body.id}).populate('a_cargo').populate('impa_cargo')
    return res.status(200).json(eqp)
}
