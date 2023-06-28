import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import logoImage from "../media/xd.png";

const PDFComp = ({ data }) => {
  const [pdfBase64, setPdfBase64] = useState("");

  useEffect(() => {
    generatePDF().then((pdfBytes) => {
      const base64 = btoa(String.fromCharCode(...pdfBytes));
      setPdfBase64(base64);
    });
  }, []);

  async function generatePDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

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
    const titleX = width - titleWidth - 450;
    const titleY =
      height - stripeHeight + stripeHeight / 2 - titleFontSize / 2 + 7;
    page.drawText(title, {
      x: titleX,
      y: titleY,
      size: titleFontSize,
      font: titleFont,
      color: rgb(1, 1, 1),
    });

    page.drawImage(logoImageEmbed, {
      x: 400,
      y: height - 50,
      width: 50,
      height: 50,
    });

    const stripeText = "un buen lugar para";
    const stripeTextFontSize = 17;
    const stripeTextWidth = font.widthOfTextAtSize(
      stripeText,
      stripeTextFontSize
    );
    const stripeTextX = 400 + 50 + 10;
    const stripeTextY =
      height - stripeHeight + stripeHeight / 2 - stripeTextFontSize / -5;
    page.drawText(stripeText, {
      x: stripeTextX,
      y: stripeTextY,
      size: stripeTextFontSize,
      font: font,
      color: rgb(1, 1, 1),
    });

    const logoText2 = "un buen momento";
    const logoText2FontSize = 17;
    const logoText2X = 400 + 50 + 10;
    const logoText2Y =
      height - stripeHeight + stripeHeight / 2 - stripeTextFontSize - 1;
    page.drawText(logoText2, {
      x: logoText2X,
      y: logoText2Y,
      size: logoText2FontSize,
      font: font,
      color: rgb(1, 1, 1),
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
      "fecha:25/11/2023                                        proveedor: samanta & yair\nID Salon/Oficina:                                                  Empresa:_________\n    #262511\n";

    const nuboxTextLines = nuboxText.split("\n");
    const nuboxTextHeight =
      textFontSize * lineHeightMultiplier * nuboxTextLines.length;
    const nuboxTextX = (width * 0.1) / 2;
    const rentaTextHeight = textFontSize * lineHeightMultiplier;
    const rentaTextYAdjusted = 885;
    const nuboxTextY = rentaTextYAdjusted - nuboxTextHeight - 70;

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
      color: rgb(0, 0.1, 0.1),
      lineHeight: textFontSize * lineHeightMultiplier,
      maxWidth: width * 0.8,
      align: "justify",
    });
    //text arriba de la tabla

    //jajajaa fil
    const tableData = [
      ["HOTEL INN", "100 PEGGGOOS", "1,000"],
      ["HOTEL PICASSO", "5 PEGOS", "4,000"],
      ["SALON FMK", "10 PEGOS", "5,000"],
      ["BURJ KHALIFA", "300 PEGOS", "1,000,000"],
      ["", "                        SubTotal:", "mucho dinero"],
    ];

    const tableX = 20;
    const tableY = 580;
    const cellMargin = 25;
    const cellWidth = (width - 2 * tableX - 20) / 3;
    const cellHeight = 45;

    //inicio
    const textoArribaTabla =
      "     RESERVACION                        CAPACIDAD                               TOTAL";
    const textoArribaTablaY = tableY + 15;

    page.drawText(textoArribaTabla, {
      x: tableX,
      y: textoArribaTablaY,
      size: tableFontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    //fin

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
          fillColor: rgb(0.9, 0.9, 0.9),
        });
      });
    });

    // Agregar texto debajo de la tabla en un recuadro azul claro
    const contactText =
      "Numero: 722-123-4321                Correo: samLaPatrona@gmail.com";
    const contactTextX = tableX;
    const contactTextY = tableY - tableData.length * cellHeight - 80;
    const contactTextWidth = font.widthOfTextAtSize(contactText, textFontSize);
    const contactTextHeight = textFontSize * lineHeightMultiplier;
    const blueColor = rgb(0.3, 0.3, 1);
    page.drawRectangle({
      x: contactTextX,
      y: contactTextY,
      width: contactTextWidth + 20,
      height: contactTextHeight + 0.5,
      borderColor: blueColor,
      borderWidth: 1,
      color: blueColor,
    });
    page.drawText(contactText, {
      x: contactTextX + 10,
      y: contactTextY + 5,
      size: textFontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Agregar código de confirmación debajo del texto de contacto
    const confirmationCode = "Código de confirmación:";
    const confirmationCodeX = contactTextX;
    const confirmationCodeY = contactTextY - contactTextHeight - 10;
    page.drawText(confirmationCode, {
      x: confirmationCodeX + 10,
      y: confirmationCodeY + 5,
      size: textFontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Agregar texto "Hola mundo" debajo del código de confirmación
    const helloWorldText = "CsUaLmIpTuO RtIaCO DESAM";
    const helloWorldTextX = contactTextX;
    const helloWorldTextY = confirmationCodeY - contactTextHeight - 10;
    page.drawText(helloWorldText, {
      x: helloWorldTextX + 10,
      y: helloWorldTextY + 5,
      size: textFontSize,
      font: font,
      color: rgb(0, 0, 0),
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
      <div style={{ marginTop: "10px", fontSize: "2em" }}>HOLA</div>
      {pdfBase64 && (
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
            src={`data:application/pdf;base64,${pdfBase64}`}
            title="Generated PDF"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default PDFComp;
