import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PDFComp = () => {
  const [pdfBase64, setPdfBase64] = useState("");

  useEffect(() => {
    generatePDF().then((pdfBytes) => {
      const base64 = btoa(String.fromCharCode(...pdfBytes));
      setPdfBase64(base64);
      console.log(base64);
    });
  }, []);

  async function generatePDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 30;

    const { width, height } = page.getSize();

    page.drawText("aweooo awebooon JavaScript is awesome!", {
      x: 30,
      y: height - 4 * fontSize,
      size: fontSize,
      font: font,
      color: rgb(0, 0.53, 0.71),
    });
    page.drawText("aweooo awebooon JavaScript is awesome!", {
      x: 30,
      y: height - 5 * fontSize,
      size: fontSize,
      font: font,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  return (
    <div>
      <div>PDFComp</div>
      {pdfBase64 && (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64}`}
          title="Generated PDF"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
};

export default PDFComp;
