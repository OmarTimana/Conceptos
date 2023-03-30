import {Schema,model} from 'mongoose'

const procesadorSchema=new Schema({
    name:{type:String},
    versionKey: false
})

export default model('Procesador',procesadorSchema)