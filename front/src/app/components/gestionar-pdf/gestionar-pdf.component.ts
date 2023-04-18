import { Component } from '@angular/core';

@Component({
  selector: 'app-gestionar-pdf',
  templateUrl: './gestionar-pdf.component.html',
  styleUrls: ['./gestionar-pdf.component.css']
})
export class GestionarPdfComponent {

  src: string = 'assets/ITINERARIO Y RECOMENDACIONES RUTA DEL SOL .pdf';  // Path to your PDF document.

  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = true;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

}
