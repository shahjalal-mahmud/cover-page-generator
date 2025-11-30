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
    
    // Validate only rating (description is optional)
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        name: formData.name || 'Anonymous',
        rating: rating,
        description: formData.description || 'No description provided',
        timestamp: new Date().toISOString()
      };

      console.log('Submitting to Google Sheets:', submissionData);

      // Submit to Google Apps Script - using FormData approach (more reliable)
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(submissionData));

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend
      });

      // For Google Apps Script, we need to handle the response differently
      const result = await response.text();
      console.log('Raw response:', result);

      // Try to parse as JSON, if it fails, assume success
      try {
        const jsonResult = JSON.parse(result);
        if (jsonResult.status === 'success') {
          setIsSubmitted(true);
          console.log('Feedback saved successfully!');
        } else {
          throw new Error(jsonResult.message);
        }
      } catch (parseError) {
        // If we can't parse JSON, assume it worked (Google Apps Script sometimes returns HTML)
        console.log('Assuming success - could not parse response');
        setIsSubmitted(true);
      }
      
      // Reset form after delay
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
    <div className="flex justify-center space-x-2 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-3xl transition-transform duration-200 transform hover:scale-125 ${
            star <= (hoverRating || rating)
              ? 'text-yellow-400'
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
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-3xl group"
        aria-label="Give Feedback"
      >
        <span className="group-hover:scale-110 transition-transform duration-300">💬</span>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-base-100 rounded-3xl shadow-2xl w-full max-w-md border border-base-300/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {isSubmitted ? 'Thank You! 🎉' : 'Share Your Thoughts'}
              </h3>
              <p className="text-white/90">
                {isSubmitted 
                  ? 'Your feedback means the world to us!'
                  : 'Help us improve your experience'
                }
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-base-content/80 mb-3 text-center">
                      How would you rate your experience? *
                    </label>
                    <StarRating
                      rating={rating}
                      setRating={setRating}
                      hoverRating={hoverRating}
                      setHoverRating={setHoverRating}
                    />
                    {rating === 0 && (
                      <p className="text-error text-sm text-center mt-2">
                        Please select a rating
                      </p>
                    )}
                  </div>

                  {/* Name (Optional) */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-base-content/80 mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Description (Optional) */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-base-content/80 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your experience, report a bug, or share your ideas..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-6 py-3 bg-base-300 text-base-content rounded-2xl font-semibold transition-all duration-300 hover:bg-base-400 hover:scale-105"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !rating}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="loading loading-spinner loading-sm mr-2"></div>
                          Sending...
                        </span>
                      ) : (
                        'Send Feedback'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Message */
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h4 className="text-xl font-bold text-base-content mb-2">
                    Feedback Saved Successfully!
                  </h4>
                  <p className="text-base-content/70">
                    Thank you for helping us improve. We appreciate you! 💖
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;