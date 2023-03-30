import {Schema,model} from 'mongoose'

const discoduroSchema=new Schema({
    name:{type:String},
    versionKey: false
})

export default model('Disco',discoduroSchema)