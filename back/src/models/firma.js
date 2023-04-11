import {Schema,model} from 'mongoose'

const FrimaSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    cargo:{
        type:String,
        require:true
    },
    file:{
        Type:String,
        require:false
    }    
},
{
    //agregamos método para generar fecha de creación y de modificación
    timestamps:true
})


export default model('Firma',FrimaSchema)