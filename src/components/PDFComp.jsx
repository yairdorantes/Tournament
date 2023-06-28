import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import logoImage from "../media/xd.png";

const PDFComp = ({ data }) => {
  const [pdfBase644, setPdfBase64] = useState("");
  useEffect(() => {
    generatePDF().then((pdfBytes) => {
      const base64 = btoa(String.fromCharCode(...pdfBytes));
      setPdfBase64(base64);
      // console.log(base64);
    });
  }, []);

  async function generatePDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textFontSize = 17;
    const smallFontSize = 20;
    const tableFontSize = 14;
    const lineHeightMultiplier = 1.5;

    const { width, height } = page.getSize();

    const logoImageResponse = await fetch(logoImage);
    const logoImageArrayBuffer = await logoImageResponse.arrayBuffer();
    const logoImageBytes = new Uint8Array(logoImageArrayBuffer);
    const logoImageEmbed = await pdfDoc.embedPng(logoImageBytes);

    const stripeHeight = 50;
    page.drawRectangle({
      x: 0,
      y: height - stripeHeight,
      width,
      height: stripeHeight,
      color: rgb(0, 0.53, 0.71),
      fillOpacity: 1,
    });

    const title = "Nubox";
    const titleFontSize = 40;
    const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
    const titleX = (width - titleWidth) / 2;
    const titleY =
      height - stripeHeight + stripeHeight / 2 - titleFontSize / 2 + 7;
    page.drawText(title, {
      x: titleX,
      y: titleY,
      size: titleFontSize,
      font: font,
      color: rgb(1, 1, 1),
    });

    page.drawImage(logoImageEmbed, {
      x: 5,
      y: height - 50,
      width: 50,
      height: 50,
    });

    page.drawImage(logoImageEmbed, {
      x: width - 55,
      y: height - 50,
      width: 50,
      height: 50,
    });

    const rentaText = "Renta de espacios que te dan libertad y flexibilidad";
    const rentaTextWidth = font.widthOfTextAtSize(rentaText, textFontSize);
    const rentaTextX = (width - rentaTextWidth) / 2;
    const rentaTextY = height - stripeHeight - 20;
    page.drawText(rentaText, {
      x: rentaTextX,
      y: rentaTextY,
      size: textFontSize,
      font: font,
      color: rgb(0, 0.53, 0.71),
      letterSpacing: -1,
    });

    const nuboxText =
      "Nubox: Renta de Espacios que te Dan Libertad y Flexibilidad.\nOficinas y salones en alquiler, diseñados para adaptarse a tus necesidades empresariales.\nContratos flexibles por horas, días o meses.\nEspacios equipados con tecnología de vanguardia y servicios adicionales.\nTrabaja con comodidad y libertad en Nubox.\nContáctanos ahora mismo.";

    const nuboxTextLines = nuboxText.split("\n");
    const nuboxTextHeight =
      textFontSize * lineHeightMultiplier * nuboxTextLines.length;
    const nuboxTextX = (width * 0.1) / 2;

    // Ajustar la separación vertical entre los textos
    const rentaTextHeight = textFontSize * lineHeightMultiplier;
    const separation = 10; // Separación vertical deseada entre los textos
    const rentaTextYAdjusted = 885;
    const nuboxTextY = rentaTextYAdjusted - nuboxTextHeight;

    page.drawText(rentaText, {
      x: rentaTextX,
      y: rentaTextY,
      size: textFontSize,
      font: font,
      color: rgb(0, 0.53, 0.71),
      letterSpacing: -1,
    });

    page.drawText(nuboxText, {
      x: nuboxTextX,
      y: nuboxTextY,
      size: textFontSize,
      font: font,
      color: rgb(0, 0.53, 0.71),
      lineHeight: textFontSize * lineHeightMultiplier,
      maxWidth: width * 0.8,
      align: "justify",
    });

    const tableData = [
      ["ID de oficina o salón", "1234"],
      ["Nombre completo", "Yair Ismael Master Master"],
      ["Correo electrónico de registro", "yairMasterlol@gmail.com"],
      ["Empresa encargada", "nubox"],
      ["Fecha de petición", "25/08/2002"],
      ["Hora inicio y fin", "10:00 pm - 1:00 am"],
      ["Capacidad", "100 personas"],
      ["Código de reservación", "202015012"],
      ["Número de edificio", "20"],
      ["Ubicación", "Lomas a Geo 15 Av. Siempre Viva"],
      ["Precio", "45,000 (cuarenta y cinco mil pesos)"],
      ["", ""],
    ];

    const tableX = 20;
    const tableY = 500; // Ajustar la posición vertical de la tabla
    const cellMargin = 25;
    const cellWidth = (width - 2 * tableX) / 2;
    const cellHeight = 40;

    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellX = tableX + columnIndex * cellWidth;
        const cellY = tableY - rowIndex * cellHeight;

        page.drawText(cell, {
          x: cellX + cellMargin,
          y: cellY - cellMargin,
          size: tableFontSize,
          font: font,
          color: rgb(0, 0, 0),
        });

        page.drawRectangle({
          x: cellX,
          y: cellY,
          width: cellWidth,
          height: cellHeight,
          borderWidth: 0.5,
          borderColor: rgb(0, 0, 0),
          fillColor: rgb(0.9, 0.9, 0.9), // Color de fondo de las celdas
        });
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginTop: "20px", fontSize: "2em" }}>HOLA</div>
      {pdfBase644 && (
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <iframe
            src={`data:application/pdf;base64,${pdfBase644}`}
            title="Generated PDF"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default PDFComp;