import {Schema,model} from 'mongoose'

const fabricanteSchema=new Schema({
    name:{type:String},
    versionKey: false 
})

export default model('Fabricante',fabricanteSchema)