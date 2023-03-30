import Tabla from '../models/tabla' ;

//método para traer todas las tablas
export const getTablas=async(req,res)=>{
    const tablas=await Tabla.find();
    return tablas;   
    
}
