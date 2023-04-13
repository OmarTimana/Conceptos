import { Component } from '@angular/core';


const equipos=[
  {"id":1,"Qr":"2365","Fabricante":"Lenovo","Referencia":"Thinkbook",
  "Disco Duro":"WDC 500Gb HDD","RAM":"4GB","Procesador":"Intel core i7",
  "Persona a Cargo":"Ignacio Pérez","Observaciones":"El PC pertenece a otra dependendencia",
  "qrimp":"3456","refimp":"HP LASERJET","percargoimp":"Ignacio Pérez"},
]


const COLUMNS_SCHEMA = [
  {
      key: "id",
      type: "number",
      label: "id"
  },
  {
      key: "Qr",
      type: "text",
      label: "Qr"
  },
  {
      key: "Fabricante",
      type: "text",
      label: "Fabricante"
  },
  {
    key: "Referencia",
    type: "text",
    label: "Referencia"
  },
  {
    key: "Disco Duro",
    type: "text",
    label: "Disco Duro"
  },
  {
    key: "RAM",
    type: "text",
    label: "RAM"
  },
  {
    key: "Procesador",
    type: "text",
    label: "Procesador"
  },
  {
    key: "Persona a Cargo",
    type: "text",
    label: "Persona a Cargo"
  },
  {
    key: "qrimp",
    type: "text",
    label: "qrimp"
  },
  {
    key: "refimp",
    type: "text",
    label: "refimp"
  },
  {
    key: "percargoimp",
    type: "text",
    label: "percargoimp"
  },
  {
    key: "Observaciones",
    type: "text",
    label: "Observaciones"
  },
  {
      key: "isEdit",
      type: "isEdit",
      label: "isEdit"
  }
]
@Component({
  selector: 'app-editarconcepto',
  templateUrl: './editarconcepto.component.html',
  styleUrls: ['./editarconcepto.component.css']
})
export class EditarconceptoComponent {

  displayedColumns:string[]=['id','Qr','Fabricante','Referencia',
  'Disco Duro','RAM','Procesador','Persona a Cargo','qrimp','refimp',
  'percargoimp','Observaciones','isEdit']
  dataSource:any=equipos;
  columnsSchema:any=COLUMNS_SCHEMA;
}
