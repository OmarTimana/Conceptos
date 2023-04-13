import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modequipo',
  templateUrl: './modequipo.component.html',
  styleUrls: ['./modequipo.component.css']
})
export class ModequipoComponent {

  equipo = {
    qr: '',
    fabricante: '',
    referencia: '',
    disco_duro: '',
    ram: '',
    procesador: '',
    a_cargo: '',
    impqr: '',
    impref: '',
    impa_cargo: ''
  }

  fabricantes :any= [];
  referencias:any=[];
  disks:any=[];
  procs:any=[];
  people:any=[];
  refimps:any=[]

  myControl = new FormControl('')
  options:string[] = []

  constructor(public authService: AuthService) { 
    this.getFabricantes()
    this.getReferencias()
    this.getDiscos()
    this.getProcesa()
    this.getPeopleCargo()
    this.getRefIm()
  }

  onFab(e: any) {
    this.equipo.fabricante = e.target.value;
  }

  getFabricantes() {
    this.authService.getFabs().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.fabricantes.push(i);
        }

      },
      err => console.log(err)
    );
  };

  onRef(e: any) {
    this.equipo.referencia = e.target.value;
  }

  getReferencias() {
    this.authService.getRefpc().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.referencias.push(i);
        }

      },
      err => console.log(err)
    );
  };

  onDisk(e: any) {
    this.equipo.disco_duro = e.target.value;
  }

  getDiscos() {
    this.authService.getDisks().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.disks.push(i);
        }

      },
      err => console.log(err)
    );
  };

  onProc(e: any) {
    this.equipo.procesador= e.target.value;
  }

  getProcesa() {
    this.authService.getProcesadores().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.procs.push(i);
        }

      },
      err => console.log(err)
    );
  };

  onPer(e: any) {
    this.equipo.a_cargo= e.target.value;
  }

  getPeopleCargo() {
    this.authService.getPeopleCargo().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.people.push(i);
        }

      },
      err => console.log(err)
    );
  };

  onPerImp(e: any) {
    this.equipo.impa_cargo= e.target.value;
  }

  onRefImp(e: any) {
    this.equipo.impref= e.target.value;
  }

  getRefIm() {
    this.authService.getRefimp().subscribe(
      res => {

        for (let i of Object.values(res)) {
          this.refimps.push(i);
        }

      },
      err => console.log(err)
    );
  };

  Complete($e:any){
    const body={id:$e.target.value}
    this.authService.getEqps(body).subscribe(res=>{
      if (res && res.length!=0) {
        this.equipo=res
        if (this.equipo.a_cargo) {
          this.equipo.a_cargo=res.a_cargo.ced
        }
        if (this.equipo.impa_cargo) {
          this.equipo.impa_cargo=res.impa_cargo.ced
        }
      }
    })
  }

  public createEquipo() {
    if((this.equipo.a_cargo.length>0 || this.equipo.impa_cargo.length>0) && this.equipo.qr.length>0){
      this.authService.createEquipo(this.equipo).subscribe(
        res=>{        
          //se registra al usuario y se lanza un mensaje de éxito
          Swal.fire("Registro exitoso","Equipo Añadido","success")  
          //luego se limpian todos los campos
          this.equipo.a_cargo=''
          this.equipo.impa_cargo=''
          this.equipo.disco_duro=''
          this.equipo.fabricante=''
          this.equipo.procesador=''
          this.equipo.impqr=''
          this.equipo.impref=''
          this.equipo.ram=''
          this.equipo.referencia=''
          this.equipo.qr=''
         },
         //en caso de error se muestra el error por consola
         err=>{
          if (err.error.message==='Persona a Cargo no encontrado') {
            Swal.fire("Error",err.error.message,"error")
          }else{
            Swal.fire("Error","El equipo ya existe","error")
          }
         }
      )
    }
  }

  cliko(){
    this.equipo.fabricante="XD"
  }
}
