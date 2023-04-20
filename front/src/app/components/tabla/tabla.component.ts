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

  constructor( public dialog: MatDialog ) { }

  openEquipo(): void {
    const d=this.dialog.open( ModequipoComponent, {
      height:'90%',
      width:'70%'
    });
    d.afterClosed().subscribe(res=>{
      if (res) {
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
        this.dataSource.paginator=this.paginator
      }
    })
  }

  openFabricante(): void {
    const d=this.dialog.open( ModfabricanteComponent );
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

  displayedColumns: string[] = ['QR','Fabricante','Referencia','Disco','Ram','Procesador','ACargo','QRIMP','RefIMP','IMPACargo','Observasiones','Acciones'];
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

const UNITS_DATA: Unit[] = [];