import React, { useState } from "react";
import { FiDownload, FiPrinter, FiMail, FiShare2, FiCheck, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFilePdf, FaFileImage } from "react-icons/fa";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";

const DownloadActions = ({ previewRef, formData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState('');

  const generateImage = async (format = 'png', quality = 0.8) => {
    if (!previewRef.current) {
      throw new Error("Preview not ready!");
    }

    const element = previewRef.current;
    
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'eager';
    });

    if (format === 'jpeg') {
      return await toJpeg(element, {
        quality: quality,
        pixelRatio: 1.5,
        backgroundColor: '#ffffff',
        cacheBust: false,
        filter: (node) => {
          return true;
        }
      });
    } else {
      return await toPng(element, {
        quality: quality,
        pixelRatio: 1.5,
        backgroundColor: '#ffffff',
        cacheBust: false
      });
    }
  };

  const generatePNG = async () => {
    setIsGenerating(true);
    setActiveAction('png');

    try {
      const dataUrl = await generateImage('png', 0.9);
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
    setIsGenerating(true);
    setActiveAction('pdf');

    try {
      const dataUrl = await generateImage('jpeg', 0.85);

      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

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
      const dataUrl = await generateImage('jpeg', 0.7);

      const subject = encodeURIComponent(`Cover Page - ${formData.documentType || 'Document'}`);
      const body = encodeURIComponent(
        `Hello!\n\nI'm sharing my ${formData.documentType || 'document'} cover page.\n` +
        `Student: ${formData.studentName || 'N/A'}\n` +
        `Course: ${formData.courseTitle || 'N/A'}\n\n` +
        `Best regards,\n${formData.studentName || 'Student'}`
      );

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
    setIsGenerating(true);
    setActiveAction('whatsapp');

    try {
      const text = encodeURIComponent(
        `Check out my ${formData.documentType || 'document'} cover page!\n` +
        `Student: ${formData.studentName || 'N/A'}\n` +
        `Course: ${formData.courseTitle || 'N/A'}\n` +
        `Generated via CoverMagic ✨`
      );

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
    setIsGenerating(true);
    setActiveAction('copy');

    try {
      const dataUrl = await generateImage('png', 0.8);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      const fallbackCopy = async () => {
        const dataUrl = await generateImage('png', 0.8);
        const input = document.createElement('input');
        input.value = dataUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
      
      try {
        await fallbackCopy();
      } catch (fallbackError) {
        alert("Right-click on the preview and 'Copy Image' to copy manually.");
      }
    } finally {
      setIsGenerating(false);
      setActiveAction('');
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="relative">
              <div className="w-20 h-20 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl">
                {activeAction === 'pdf' && '📄'}
                {activeAction === 'png' && '🖼️'}
                {activeAction === 'email' && '📧'}
                {activeAction === 'whatsapp' && '💚'}
                {activeAction === 'copy' && '📋'}
                {activeAction === 'print' && '🖨️'}
              </span>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-1">
                {activeAction === 'pdf' && 'Creating PDF...'}
                {activeAction === 'png' && 'Creating PNG...'}
                {activeAction === 'email' && 'Preparing email...'}
                {activeAction === 'whatsapp' && 'Opening WhatsApp...'}
                {activeAction === 'copy' && 'Copying to clipboard...'}
                {activeAction === 'print' && 'Opening printer...'}
              </p>
              <p className="text-sm text-gray-500">Just a moment!</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Download Actions */}
      <div>
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <FiDownload className="text-purple-600" />
          Download Your Cover Page
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Download PDF */}
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className={`
              group relative overflow-hidden p-6 rounded-2xl font-bold transition-all duration-300 
              flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-2xl transform hover:scale-105
              ${activeAction === 'pdf' 
                ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white border-red-400' 
                : 'bg-gradient-to-br from-red-50 to-pink-50 text-red-700 border-red-200 hover:border-red-300'
              }
            `}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className={`relative p-4 rounded-xl ${activeAction === 'pdf' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
              <FaFilePdf className={`text-3xl ${activeAction === 'pdf' ? 'text-white' : 'text-red-500'}`} />
            </div>
            <div className="relative">
              <span className="text-base">Download PDF</span>
              <p className="text-xs opacity-70 mt-1">For printing</p>
            </div>
          </button>

          {/* Download PNG */}
          <button
            onClick={generatePNG}
            disabled={isGenerating}
            className={`
              group relative overflow-hidden p-6 rounded-2xl font-bold transition-all duration-300 
              flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-2xl transform hover:scale-105
              ${activeAction === 'png' 
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-400' 
                : 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 border-blue-200 hover:border-blue-300'
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className={`relative p-4 rounded-xl ${activeAction === 'png' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
              <FaFileImage className={`text-3xl ${activeAction === 'png' ? 'text-white' : 'text-blue-500'}`} />
            </div>
            <div className="relative">
              <span className="text-base">Download PNG</span>
              <p className="text-xs opacity-70 mt-1">For digital use</p>
            </div>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            disabled={isGenerating}
            className={`
              group relative overflow-hidden p-6 rounded-2xl font-bold transition-all duration-300 
              flex flex-col items-center gap-3 border-2 shadow-lg hover:shadow-2xl transform hover:scale-105
              ${activeAction === 'print' 
                ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-purple-400' 
                : 'bg-gradient-to-br from-purple-50 to-indigo-50 text-purple-700 border-purple-200 hover:border-purple-300'
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className={`relative p-4 rounded-xl ${activeAction === 'print' ? 'bg-white/20' : 'bg-white shadow-md'}`}>
              <FiPrinter className={`text-3xl ${activeAction === 'print' ? 'text-white' : 'text-purple-500'}`} />
            </div>
            <div className="relative">
              <span className="text-base">Print</span>
              <p className="text-xs opacity-70 mt-1">Direct to printer</p>
            </div>
          </button>
        </div>
      </div>

      {/* Share Section */}
      <div>
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <FiShare2 className="text-purple-600" />
          Share With Friends
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Email Share */}
          <button
            onClick={shareViaEmail}
            disabled={isGenerating}
            className={`
              group p-4 rounded-xl font-bold transition-all duration-300 
              flex flex-col items-center gap-2 border-2 shadow-md hover:shadow-lg transform hover:scale-105
              ${activeAction === 'email' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400' 
                : 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200 hover:border-orange-300'
              }
            `}
          >
            <FiMail className={`text-2xl ${activeAction === 'email' ? 'text-white' : 'text-orange-500'}`} />
            <span className="text-sm">Email</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={shareViaWhatsApp}
            disabled={isGenerating}
            className={`
              group p-4 rounded-xl font-bold transition-all duration-300 
              flex flex-col items-center gap-2 border-2 shadow-md hover:shadow-lg transform hover:scale-105
              ${activeAction === 'whatsapp' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:border-green-300'
              }
            `}
          >
            <FaWhatsapp className={`text-2xl ${activeAction === 'whatsapp' ? 'text-white' : 'text-green-500'}`} />
            <span className="text-sm">WhatsApp</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={copyToClipboard}
            disabled={isGenerating}
            className={`
              group p-4 rounded-xl font-bold transition-all duration-300 
              flex flex-col items-center gap-2 border-2 shadow-md hover:shadow-lg transform hover:scale-105
              ${activeAction === 'copy' || copied
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-400' 
                : 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200 hover:border-yellow-300'
              }
            `}
          >
            {copied ? (
              <FiCheck className="text-2xl text-white" />
            ) : (
              <FiCopy className={`text-2xl ${activeAction === 'copy' ? 'text-white' : 'text-yellow-600'}`} />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Share Link */}
          <button
            onClick={() => alert('Share link functionality coming soon! 🌟')}
            disabled={isGenerating}
            className="group p-4 rounded-xl font-bold transition-all duration-300 
                      flex flex-col items-center gap-2 border-2 border-indigo-200 shadow-md hover:shadow-lg
                      bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 
                      hover:border-indigo-300 transform hover:scale-105"
          >
            <FiShare2 className="text-2xl text-indigo-500" />
            <span className="text-sm">Link</span>
          </button>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-bold text-purple-900 mb-1">Pro Tip</p>
            <p className="text-sm text-purple-700">
              Download as <strong>PDF</strong> for printing or <strong>PNG</strong> for digital submissions. Both formats maintain high quality!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadActions;