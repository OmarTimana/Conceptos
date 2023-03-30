import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
//se crea el modelo del usuario, aquí se definen los atributos del mismo

const userSchema=new Schema({
    name:{type:String},
    ced:{ type: String, require: true, index:true, unique:true},
    roles:[{
        //se usa la propiedad ref para crear relaciones entre las tablas de mongoDB
        ref:"Role",
        type:Schema.Types.ObjectId
    }],
    email : { type: String, require: true,unique:true,sparse:true},
    password:{ type:String,require:true},
    telefono:{ type:String,require:true}
},
{
    //agregamos método para generar fecha de creación y de modificación
    timestamps:true
})

//método para encriptar password para signup
userSchema.statics.encryptPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
//médodo para comparar password para signin
userSchema.statics.comparePassword=async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword)
}


//exportamos el modelo para usarlo en los controladores

export default model('User',userSchema)