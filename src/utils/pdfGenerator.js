import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (element, fileName = 'cover_page') => {
  try {
    // Store original styles
    const originalStyles = {
      transform: element.style.transform,
      transformOrigin: element.style.transformOrigin,
      width: element.style.width,
      height: element.style.height,
      position: element.style.position,
      top: element.style.top,
      left: element.style.left,
      zIndex: element.style.zIndex
    };

    // Optimized styles for capture
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';
    element.style.width = '210mm';
    element.style.height = '297mm';
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '9999';

    // Force reflow
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 1.5, // Reduced from 2 to 1.5
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
      // Add quality optimization
      onclone: (clonedDoc) => {
        // Optimize images in the cloned document
        const images = clonedDoc.querySelectorAll('img');
        images.forEach(img => {
          img.loading = 'eager';
        });
      }
    });

    // Restore original styles
    Object.assign(element.style, originalStyles);

    // Convert to JPEG with lower quality for smaller file size
    const imgData = canvas.toDataURL('image/jpeg', 0.85); // Using JPEG instead of PNG
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable PDF compression
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
    // Save PDF with compression
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
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 2, // Reduced from 3 to 2
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

    // Use lower quality for PNG
    const link = document.createElement('a');
    link.download = `${fileName}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 0.9); // Reduced quality
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('PNG Generation Error:', error);
    throw new Error('Failed to generate PNG');
  }
};