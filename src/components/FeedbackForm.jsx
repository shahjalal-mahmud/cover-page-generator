import React, { useState } from 'react';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // MUST use formResponse — not viewform
  const GOOGLE_FORM_POST_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeTZCPx4CdWrrtIEn86qZSt_O7MYLDZaXrzOkPOcTGCKv4rlA/formResponse";

  const FORM_FIELD_IDS = {
    name: "entry.2120158850",
    description: "entry.1648890775",
    rating: "entry.1521122483"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await fetch(GOOGLE_FORM_POST_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          [FORM_FIELD_IDS.name]: name,
          [FORM_FIELD_IDS.description]: description,
          [FORM_FIELD_IDS.rating]: rating.toString()
        })
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        e.target.reset();
        setRating(0);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
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
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-base-100 rounded-3xl shadow-2xl max-w-md w-full border border-base-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-3xl text-center text-white">
              <h3 className="text-2xl font-bold">
                {isSubmitted ? "Thank You! 🎉" : "Share Your Thoughts"}
              </h3>
            </div>

            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <StarRating
                    rating={rating}
                    setRating={setRating}
                    hoverRating={hoverRating}
                    setHoverRating={setHoverRating}
                  />

                  {/* Name */}
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 bg-base-200 rounded-2xl border border-base-300"
                  />

                  {/* Description */}
                  <textarea
                    name="description"
                    required
                    rows="4"
                    placeholder="Describe your feedback..."
                    className="w-full px-4 py-3 bg-base-200 rounded-2xl border border-base-300 resize-none"
                  ></textarea>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-6 py-3 bg-base-300 rounded-2xl"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || rating === 0}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl"
                    >
                      {isSubmitting ? "Sending..." : "Send Feedback"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <h4 className="text-xl font-bold mb-2">Feedback Sent!</h4>
                  <button
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl"
                    onClick={() => setIsOpen(false)}
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