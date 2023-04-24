import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

//Material
import {MatDialog} from '@angular/material/dialog';
import { ModfabricanteComponent } from '../modfabricante/modfabricante.component';
import { ModequipoComponent } from '../modequipo/modequipo.component';
import { ModiscoComponent } from '../modisco/modisco.component';
import { ModprocesadorComponent } from '../modprocesador/modprocesador.component';
import { ModrefpcComponent } from '../modrefpc/modrefpc.component';
import { RefimpComponent } from '../refimp/refimp.component';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements AfterViewInit {
 
  equipo='hello'

  constructor( public dialog: MatDialog ) { }

  @ViewChild(ModequipoComponent) equipoChil:any;

  verQr():void{
    this.equipo=this.equipoChil.qrenviar;
  }


  openEquipo(): void {
    const d=this.dialog.open( ModequipoComponent, {
      height:'90%',
      width:'70%'
    });
    d.afterClosed().subscribe(res=>{
      UNITS_DATA.push({
        QR: res.qr,
        Fabricante: res.fabricante,
        Referencia: res.referencia,
        Disco: res.disco_duro,
        Ram: res.ram,
        Procesador: res.procesador,
        ACargo: res.a_cargo,
        QRIMP: res.impqr,
        RefIMP: res.impref,
        IMPACargo: res.impa_cargo,
        Observasiones: res.observaciones,
      })
      this.dataSource = new MatTableDataSource<Unit>(UNITS_DATA);
    })
  }

  openFabricante(): void {
    const d=this.dialog.open( ModfabricanteComponent );
    d.afterClosed().subscribe(res=>{
      console.log(res);
    })
  }

  openDisco(): void {
    this.dialog.open( ModiscoComponent );
  }

  openProcesador(): void {
    this.dialog.open( ModprocesadorComponent );
  }

  openReferenciaPC(): void {
    this.dialog.open( ModrefpcComponent );
  }

  openImpresora(): void {
    this.dialog.open( RefimpComponent );
  }

  displayedColumns: string[] = ['QR','Fabricante','Referencia','Disco','Ram','Procesador','ACargo','QRIMP','RefIMP','IMPACargo','Observasiones'];
  dataSource = new MatTableDataSource<Unit>(UNITS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  equipos=[]

  tabla={equipost:this.equipos}
}

export interface Unit {
  QR: number;
  Fabricante: string;
  Referencia: string;
  Disco: string;
  Ram:String;
  Procesador:String;
  ACargo:number;
  QRIMP:number;
  RefIMP:String;
  IMPACargo:number;
  Observasiones:string;
}

const UNITS_DATA: Unit[] = [
  {QR: 1, Fabricante: 'Hydrogen', Referencia: 'wea',Disco:'XD',Ram:'3',Procesador:'1',ACargo:123,
  QRIMP:2,RefIMP:':v',IMPACargo:2,Observasiones:'chucha'},
];