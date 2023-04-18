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

  createDocumento(){}

}
