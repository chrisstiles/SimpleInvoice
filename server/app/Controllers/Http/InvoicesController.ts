import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PDFDocument from 'pdfkit';
import fs from 'fs';

export default class InvoicesController {
  public async test({ response }: HttpContextContract) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('invoice.pdf'));

    doc
      .fontSize(25)
      .text('This is a PDF generated from a controller');

    doc.end();

    response.response.writeHead(200, {
      'Content-Type': 'application/pdf'
    });

    doc.pipe(response.response);
  }
}
