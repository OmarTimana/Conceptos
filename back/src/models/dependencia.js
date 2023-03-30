import {Schema,model} from 'mongoose'

//se crea el modelo dependencia que tiene los atributos
//cod_uni: es el código identificador, es único
//name:nombre de la dependencia
//cod_tip_unidad: es el código de cada tipo de dependencia, puede ser 01,02...
//tipo_unidad: es el tipo de dependencia puede ser departamento, convenio, facultad, programa,...
const dependenciaSchema=new Schema({
    id_unidad:{type:String,unique:true},
    nombre_unidad:String,   
    tipo_unidad:
    {
    ref:"TipoDependencia",
    type:Schema.Types.ObjectId}
},{
    versionKey:false
})

//se exporta el modelo de dependencia para usarse en los controladores

export default model('Dependencia',dependenciaSchema)