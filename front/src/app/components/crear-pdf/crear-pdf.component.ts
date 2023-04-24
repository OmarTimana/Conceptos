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

 img = new Image()
 
  pdf=new jspdf({
    orientation:'portrait',
    unit:'px',
    format:'letter'
  });

  fuenteParrafo=['Times-Roman','normal']
  constructor() { }
 
  ngOnInit() {
  }
  
  
  generatePdfFile(){
    

    this.pdf.setFontSize(20);
    this.pdf.setFont('Times','bold')
    this.pdf.text('Concepto Técnico',this.pdf.internal.pageSize.width/2,25,{align:'center'});
   
   autoTable(this.pdf,{
      head:this.header,
      body:this.tableData,
      theme:'striped',
      startY:50
      
    })
    this.pdf.setFontSize(12);
    this.pdf.setFont('Times','normal')
    this.pdf.text('Hallazgos:\n\nEn la visita realizada por ',40,100)
    this.img.src = 'assets/addUser.webp'
    this.pdf.addImage(this.img, 'png',100,150,200,200)

    this.pdf.addPage('a4','landscape');
    this.pdf.text('Página dos', this.pdf.internal.pageSize.width/2,25,{align:'center'} )
    this.pdf.setProperties({
      title:'Concepto técnico Facultad de Artes',
      subject:'Se busca informar el estado de los'
    })
    
    this.pdf.output('dataurlnewwindow')

    this.pdf.save('concepto.pdf');
  }
}
