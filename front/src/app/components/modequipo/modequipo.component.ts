import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    impa_cargo: '',
    observaciones:'',
    tram:'GB'
  }


  fabricantes :any= [];
  referencias:any=[];
  disks:any=[];
  procs:any=[];
  people:any=[];
  refimps:any=[]

  myControl = new FormControl('')
  options:string[] = []

  constructor(public dialogRef: MatDialogRef<ModequipoComponent>,
    public authService: AuthService) {
    this.getFabricantes()
    this.getReferencias()
    this.getDiscos()
    this.getProcesa()
    this.getPeopleCargo()
    this.getRefIm()
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
    
  onFab(e: any) {
    let val=''
    this.fabricantes.forEach((ele: any)=>{
      if (ele.name===e.target.value) {
        val=ele.name
      }
    })
    this.equipo.fabricante = val
  }

  onRef(e: any) {
    let val=''
    this.referencias.forEach((ele: any)=>{
      if (ele.name===e.target.value) {
        val=ele.name
      }
    })
    this.equipo.referencia = val
  }

  onDisk(e: any) {
    let val=''
    this.disks.forEach((ele: any)=>{
      if (ele.name===e.target.value) {
        val=ele.name
      }
    })
    this.equipo.disco_duro = val
  }
  
  onProc(e: any) {
    let val=''
    this.procs.forEach((ele: any)=>{
      if (ele.name===e.target.value) {
        val=ele.name
      }
    })
    this.equipo.procesador= val
  }
    
  onPer(e: any) {
    let val=''
    this.people.forEach((ele: any)=>{
      if (ele.name===e.target.value || ele.ced===e.target.value) {
          val=ele.ced
        }
    })
    this.equipo.a_cargo= val
  }
    
  onPerImp(e: any) {
    this.equipo.impa_cargo= e.target.value;
  }

  onRefImp(e: any) {
    this.equipo.impref= e.target.value;
  }

  Complete($e:any){
    const body={id:$e.target.value}
    this.authService.getEqps(body).subscribe(res=>{
      if (res && res.length!=0) {
        const ram=res.ram.toString().split(' ')
        res.ram=ram[0]
        this.equipo=res
        this.equipo.tram=ram[1]
        if (this.equipo.a_cargo) {
          this.equipo.a_cargo=res.a_cargo.ced
        }
        if (this.equipo.impa_cargo) {
          this.equipo.impa_cargo=res.impa_cargo.ced
        }
      }
    })
  }

  public createEquipo() { // falta verificar emm pues casi todo elemento nmms aleja porque >:/
    if((this.equipo.a_cargo.length>0 || this.equipo.impa_cargo.length>0) && this.equipo.qr.length>0){
      this.equipo.ram=this.equipo.ram + ' ' + this.equipo.tram
      this.authService.createEquipo(this.equipo).subscribe(
        res=>{        
          //se registra al usuario y se lanza un mensaje de éxito
          Swal.fire("Registro exitoso","Equipo Añadido","success")
          this.dialogRef.close(this.equipo)
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
}
