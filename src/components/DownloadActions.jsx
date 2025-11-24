import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const DownloadActions = ({ previewRef }) => {
  const generatePNG = async () => {
    if (!previewRef.current) {
      alert("Preview not ready!");
      return;
    }

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "cover_page.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("PNG generation failed:", error);
      alert("Failed to generate PNG.");
    }
  };

  const generatePDF = async () => {
    if (!previewRef.current) {
      alert("Preview not ready!");
      return;
    }

    try {
      const element = previewRef.current;

      // Convert preview to PNG first
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
      });

      // A4 dimensions (in points for jsPDF)
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add image to PDF (full page)
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("cover_page.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <button
        onClick={generatePNG}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PNG
      </button>

      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadActions;
