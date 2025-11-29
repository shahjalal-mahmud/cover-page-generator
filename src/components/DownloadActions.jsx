import React, { useState } from "react";
import { FiDownload, FiPrinter, FiMail, FiShare2, FiCheck, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFilePdf, FaFileImage } from "react-icons/fa";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const DownloadActions = ({ previewRef, formData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState('');

  const generatePNG = async () => {
    if (!previewRef.current) {
      alert("Preview not ready!");
      return;
    }

    setIsGenerating(true);
    setActiveAction('png');

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement("a");
      const fileName = `cover_page_${formData.studentName || 'document'}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("PNG generation failed:", error);
      alert("Failed to generate PNG.");
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  const generatePDF = async () => {
    if (!previewRef.current) {
      alert("Preview not ready!");
      return;
    }

    setIsGenerating(true);
    setActiveAction('pdf');

    try {
      const element = previewRef.current;

      // Convert preview to PNG first
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      // A4 dimensions (in points for jsPDF)
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add image to PDF (full page)
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      const fileName = `cover_page_${formData.studentName || 'document'}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  const handlePrint = () => {
    setActiveAction('print');
    setTimeout(() => {
      window.print();
      setActiveAction('');
    }, 500);
  };

  const shareViaEmail = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    setActiveAction('email');

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.8,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const subject = encodeURIComponent(`Cover Page - ${formData.documentType || 'Document'}`);
      const body = encodeURIComponent(
        `Hello!\n\nI'm sharing my ${formData.documentType || 'document'} cover page.\n` +
        `Student: ${formData.studentName || 'N/A'}\n` +
        `Course: ${formData.courseTitle || 'N/A'}\n\n` +
        `Best regards,\n${formData.studentName || 'Student'}`
      );

      // In a real app, you'd upload the image and get a URL
      // For now, we'll just open email with text
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    } catch (error) {
      console.error("Email share failed:", error);
      alert("Failed to prepare email share.");
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  const shareViaWhatsApp = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    setActiveAction('whatsapp');

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.8,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const text = encodeURIComponent(
        `Check out my ${formData.documentType || 'document'} cover page!\n` +
        `Student: ${formData.studentName || 'N/A'}\n` +
        `Course: ${formData.courseTitle || 'N/A'}`
      );

      // Note: WhatsApp doesn't support data URLs directly in web
      // In a real app, you'd upload to a server first
      const whatsappLink = `https://wa.me/?text=${text}`;
      window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error("WhatsApp share failed:", error);
      alert("Failed to prepare WhatsApp share.");
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  const copyToClipboard = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    setActiveAction('copy');

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.8,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      // Fallback: show data URL for manual copy
      alert("Right-click on the preview and 'Copy Image' to copy manually.");
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  return (
    <div className="w-full">
      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-lg font-semibold text-gray-700">
              {activeAction === 'pdf' && 'Creating PDF... 📄'}
              {activeAction === 'png' && 'Creating PNG... 🖼️'}
              {activeAction === 'email' && 'Preparing email... 📧'}
              {activeAction === 'whatsapp' && 'Opening WhatsApp... 💚'}
              {activeAction === 'copy' && 'Copying to clipboard... 📋'}
              {activeAction === 'print' && 'Opening printer... 🖨️'}
            </p>
          </div>
        </div>
      )}

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {/* Download PDF */}
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`
            group relative p-4 rounded-2xl font-semibold transition-all duration-300 
            flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-xl
            ${activeAction === 'pdf' 
              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-400 transform scale-105' 
              : 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 border-green-200 hover:border-green-300 hover:transform hover:scale-105'
            }
          `}
        >
          <div className={`p-3 rounded-xl ${activeAction === 'pdf' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
            <FaFilePdf className={`text-2xl ${activeAction === 'pdf' ? 'text-white' : 'text-green-500'}`} />
          </div>
          <span className="text-sm font-bold">Download PDF</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
        </button>

        {/* Download PNG */}
        <button
          onClick={generatePNG}
          disabled={isGenerating}
          className={`
            group relative p-4 rounded-2xl font-semibold transition-all duration-300 
            flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-xl
            ${activeAction === 'png' 
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-400 transform scale-105' 
              : 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 border-blue-200 hover:border-blue-300 hover:transform hover:scale-105'
            }
          `}
        >
          <div className={`p-3 rounded-xl ${activeAction === 'png' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
            <FaFileImage className={`text-2xl ${activeAction === 'png' ? 'text-white' : 'text-blue-500'}`} />
          </div>
          <span className="text-sm font-bold">Download PNG</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          disabled={isGenerating}
          className={`
            group relative p-4 rounded-2xl font-semibold transition-all duration-300 
            flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-xl
            ${activeAction === 'print' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-400 transform scale-105' 
              : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:border-purple-300 hover:transform hover:scale-105'
            }
          `}
        >
          <div className={`p-3 rounded-xl ${activeAction === 'print' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
            <FiPrinter className={`text-2xl ${activeAction === 'print' ? 'text-white' : 'text-purple-500'}`} />
          </div>
          <span className="text-sm font-bold">Print</span>
        </button>
      </div>

      {/* Share Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          <FiShare2 className="text-purple-500" />
          Share Your Cover Page
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Email Share */}
          <button
            onClick={shareViaEmail}
            disabled={isGenerating}
            className={`
              group p-3 rounded-xl font-semibold transition-all duration-300 
              flex items-center gap-3 border-2 shadow-md hover:shadow-lg
              ${activeAction === 'email' 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 transform scale-105' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200 hover:border-red-300 hover:transform hover:scale-105'
              }
            `}
          >
            <FiMail className={`text-xl ${activeAction === 'email' ? 'text-white' : 'text-red-500'}`} />
            <span className="text-sm">Email</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={shareViaWhatsApp}
            disabled={isGenerating}
            className={`
              group p-3 rounded-xl font-semibold transition-all duration-300 
              flex items-center gap-3 border-2 shadow-md hover:shadow-lg
              ${activeAction === 'whatsapp' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 transform scale-105' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:border-green-300 hover:transform hover:scale-105'
              }
            `}
          >
            <FaWhatsapp className={`text-xl ${activeAction === 'whatsapp' ? 'text-white' : 'text-green-500'}`} />
            <span className="text-sm">WhatsApp</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={copyToClipboard}
            disabled={isGenerating}
            className={`
              group p-3 rounded-xl font-semibold transition-all duration-300 
              flex items-center gap-3 border-2 shadow-md hover:shadow-lg
              ${activeAction === 'copy' || copied
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400 transform scale-105' 
                : 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200 hover:border-orange-300 hover:transform hover:scale-105'
              }
            `}
          >
            {copied ? (
              <FiCheck className="text-xl text-white" />
            ) : (
              <FiCopy className={`text-xl ${activeAction === 'copy' ? 'text-white' : 'text-orange-500'}`} />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Share Link */}
          <button
            onClick={() => alert('Share link functionality coming soon! 🌟')}
            disabled={isGenerating}
            className="group p-3 rounded-xl font-semibold transition-all duration-300 
                      flex items-center gap-3 border-2 border-indigo-200 shadow-md hover:shadow-lg
                      bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 
                      hover:border-indigo-300 hover:transform hover:scale-105"
          >
            <FiShare2 className="text-xl text-indigo-500" />
            <span className="text-sm">Share Link</span>
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <p className="text-sm text-blue-700 text-center flex items-center justify-center gap-2">
          <span className="text-lg">💡</span>
          Tip: Download PDF for printing, PNG for digital use!
        </p>
      </div>
    </div>
  );
};

export default DownloadActions;