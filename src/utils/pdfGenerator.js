import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (element, fileName = 'cover_page') => {
  try {
    // Store original styles
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    const originalPosition = element.style.position;
    const originalTop = element.style.top;
    const originalLeft = element.style.left;

    // Reset styles for capture
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';
    element.style.width = '210mm';
    element.style.height = '297mm';
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '9999';

    // Force reflow
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Restore original styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    element.style.position = originalPosition;
    element.style.top = originalTop;
    element.style.left = originalLeft;
    element.style.zIndex = '';

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Save PDF
    pdf.save(`${fileName}_${Date.now()}.pdf`);

    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generatePNG = async (element, fileName = 'cover_page') => {
  try {
    // Store original styles
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;

    // Reset styles for capture
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';

    // Force reflow
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better PNG quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // Restore original styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;

    // Create download link
    const link = document.createElement('a');
    link.download = `${fileName}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('PNG Generation Error:', error);
    throw new Error('Failed to generate PNG');
  }
};