import { Component } from '@angular/core';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-crear-pdf',
  templateUrl: './crear-pdf.component.html',
  styleUrls: ['./crear-pdf.component.css']
})
export class CrearPdfComponent {

  header=[['QR','Fabricante','Referencia',
  'Disco duro','RAM','Procesador','Persona a cargo',
 'QR Imp','Ref Imp','Persona a Cargo Imp','Observaciones']]

 tableData=[[]]

  pdf=new jspdf();

  constructor() { }
 
  ngOnInit() {
  }
  
  generatePdfFile(){
    

    this.pdf.setFontSize(20);
    this.pdf.text('Concepto Técnico',10,8);
   
   autoTable(this.pdf,{
      head:this.header,
      body:this.tableData,
      theme:'plain',
      
    })
    this.pdf.addPage();
    this.pdf.text('Página dos',20, 20 )
    this.pdf.setProperties({
      title:'Concepto técnico Facultad de Artes',
      subject:'Se busca informar el estado de los'
    })
    this.pdf.output('dataurlnewwindow')

    this.pdf.save('concepto.pdf');
  }
}
