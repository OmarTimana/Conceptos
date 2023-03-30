import {Schema,model} from 'mongoose'

const refimpSchema=new Schema({
    name:{type:String},
    versionKey: false
})

export default model('Refimp',refimpSchema)