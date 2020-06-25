import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PDFDocument from 'pdfkit';
import PDFMake from 'pdfmake';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { TFontDictionary } from 'pdfmake/interfaces';

export default class InvoicesController {
  public async pdfkit({ response }: HttpContextContract) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('invoice.pdf'));
    doc.fontSize(25).text('This is a PDF generated by PDFKit');
    doc.text('Absolute', 0, 0);
    doc.end();

    response.response.writeHead(200, {
      'Content-Type': 'application/pdf'
    });

    doc.pipe(response.response);
  }

  public async pdfmake({ response }: HttpContextContract) {
    const printer = new PDFMake(fonts);
    const doc = printer.createPdfKitDocument({
      content: ['This is a PDF generated by PDFMake'],
      defaultStyle: {
        fontSize: 25,
        font: 'Helvetica'
      }
    });

    doc.pipe(fs.createWriteStream('invoice.pdf'));
    doc.end();

    response.response.writeHead(200, {
      'Content-Type': 'application/pdf'
    });

    doc.pipe(response.response);
  }

  public async puppeteer({ view, response }: HttpContextContract) {
    const html = view.render('pdf');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setContent(html);

    const pdf = await page.pdf({ format: 'A4' });

    response.header('content-type', 'application.pdf');
    response.send(pdf);
  }
}

const fonts: TFontDictionary = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};