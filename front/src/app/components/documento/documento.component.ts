import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {

  documento={
    para:'',
    de:'',
    asunto:'',
    hallazgos:'',
    notas:'',
    recomendaciones:'',
    firmaSop:false,
    firmaIIT:false
  }
  constructor(public authService:AuthService){}

  createDocumento(){
    if(this.documento.para.length>0)
    {
      this.authService.createDocumento(this.documento).subscribe(
        res=>{        
          //se registra al usuario y se lanza un mensaje de éxito
          Swal.fire("Registro exitoso","El documento fue registrado","success")  
          //luego se limpian todos los campos
          this.documento.para='',
          this.documento.de='',
          this.documento.hallazgos='',
          this.documento.notas='',
          this.documento.asunto=''

         },
         //en caso de error se muestra el error por consola
         err=>Swal.fire("Error","El documento ya existe","error")
      )
    }
    Swal.fire("Error","Ingrese datos válidos","error")
  }

}
