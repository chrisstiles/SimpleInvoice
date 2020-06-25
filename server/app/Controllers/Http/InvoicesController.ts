import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PDFDocument from 'pdfkit';
import fs from 'fs';

export default class InvoicesController {
  public async test({ response }: HttpContextContract) {
    // response.implicitEnd = false;

    const doc = new PDFDocument();
    // const stream = fs.createWriteStream('invoice.pdf');

    doc.pipe(fs.createWriteStream('invoice.pdf'));
    // doc.pipe(response);

    doc
      .fontSize(25)
      .text('This is a PDF generated from a controller');

    doc.end();

    response.header('Content-type', 'application/pdf');
    doc.pipe(response.response);
    return response.send(doc);
    // return pdf;
    // return await response.download(pdf);
  }
}
