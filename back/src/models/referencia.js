import {Schema,model} from 'mongoose'

const referenciaSchema=new Schema({
    name:{type:String},
    versionKey: false
})

export default model('Referencia',referenciaSchema)