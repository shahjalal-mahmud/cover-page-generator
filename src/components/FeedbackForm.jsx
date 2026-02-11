import React, { useState } from 'react';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvffxLIl6Mb9mr2H4c2fvVtFL4ROAwSUr3eif0mg9m0_JRb29MEZO49QoOhGMhCARt_w/exec';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name || 'Anonymous',
        rating: rating,
        description: formData.description || 'No description provided',
        timestamp: new Date().toISOString()
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(submissionData));

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.text();

      try {
        const jsonResult = JSON.parse(result);
        if (jsonResult.status === 'success') {
          setIsSubmitted(true);
        } else {
          throw new Error(jsonResult.message);
        }
      } catch (parseError) {
        setIsSubmitted(true);
      }
      
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setRating(0);
        setFormData({ name: '', description: '' });
      }, 3000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again. Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, setRating, hoverRating, setHoverRating }) => (
    <div className="flex justify-center gap-2 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-3xl sm:text-4xl transition-all duration-200 transform hover:scale-125 ${
            star <= (hoverRating || rating)
              ? 'text-yellow-400 drop-shadow-lg'
              : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          {star <= (hoverRating || rating) ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
        aria-label="Give Feedback"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-100 animate-pulse" />
        
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
          <span className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300">💬</span>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          
          <div className="
            relative w-full max-w-md sm:max-w-lg
            max-h-[90vh]
            bg-white
            rounded-3xl
            shadow-2xl
            flex flex-col
            overflow-hidden
          ">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition flex items-center justify-center text-white font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 px-6 sm:px-8 py-6 sm:py-8 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl">
                    {isSubmitted ? '🎉' : '💬'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                  {isSubmitted ? 'Thank You!' : 'We Value Your Feedback'}
                </h3>

                <p className="text-white/90 text-xs sm:text-sm">
                  {isSubmitted 
                    ? 'Your feedback helps us improve!'
                    : 'Help us make CoverMagic even better'
                  }
                </p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 text-center">
                      How would you rate your experience? *
                    </label>

                    <StarRating
                      rating={rating}
                      setRating={setRating}
                      hoverRating={hoverRating}
                      setHoverRating={setHoverRating}
                    />

                    {rating === 0 && (
                      <p className="text-red-500 text-xs text-center mt-2">
                        ⚠️ Please select a rating
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Feedback <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                      placeholder="Tell us what you think..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full sm:flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !rating}
                      className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Feedback'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-5 shadow-lg">
                    <span className="text-3xl">✨</span>
                  </div>

                  <h4 className="text-xl font-black text-gray-800 mb-3">
                    Feedback Received!
                  </h4>

                  <p className="text-gray-600 mb-6 text-sm">
                    Thank you for helping us improve CoverMagic. 🚀
                  </p>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

export default FeedbackForm;
