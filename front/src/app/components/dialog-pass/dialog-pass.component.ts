import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-pass',
  templateUrl: './dialog-pass.component.html',
  styleUrls: ['./dialog-pass.component.css']
})
export class DialogPassComponent {
  user={email:'',
  password:''}

  user2={email:'',
    password:'',
  passwordn:''}

  constructor(private authservice:AuthService) { }

  changePass(){
      
    const userAux={email:this.user2.email,password:this.user2.password}
    if(this.user2.password===this.user2.passwordn)

    {
      try{
        console.log("entré")
        console.log(userAux)
        this.authservice.changePassword(userAux).subscribe(

          res=>{
            console.log(res);
            if(res.message== "Error")
            {
              Swal.fire("Error","No se cambio la contraseña","error")
            }else{

            Swal.fire("Success","Contraseña cambiada con éxito","success")
            }  
          }
        )
       
      }
      catch(error)
    {
      Swal.fire("Error","No se cambió la contraseña","error")
    }
      
    }
     else Swal.fire("Error","Las contraseñas no coinciden","error")
    }

}
