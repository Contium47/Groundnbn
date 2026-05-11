import { useForm } from "react-hook-form";
import { api } from "../api/api";

import starFilled from '../imgs/ui/star-filled.svg'
import starEmpty from '../imgs/ui/star-empty.svg'

import "./ListingReviews.css";

function ListingReviews({ isAuth, reviews, id, setReviews }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: '',
      comment: ''
    }
  });

  const avgRating = (
    reviews.reduce((sum, curr) => sum + curr.rating, 0) / reviews.length
  ).toFixed(1);

  async function onSuccess(data) {
    const updatedData = {
      listingId: id,
      comment: data.comment,
      rating: data.rating,
    }
    console.log(data);
    console.log(updatedData);
    const response = await api.post(`/reviews`, updatedData);
    console.log(response.data);
    setReviews(prev => [response.data, ...prev]);
    reset()
  }

  return (
    <section className="reviews">
      <div className="reviews__header">
        <h2 className="reviews__title">Reviews</h2>
        <div className="reviews__rating">
          ⭐ {avgRating > 0 ? avgRating : 0} · {reviews.length}
          {reviews.length > 1 ? "reviews" : "review"}
        </div>
      </div>

      <form
        className={`reviews__form ${id && isAuth ? "" : "reviews__form--hidden"}`}
        onSubmit={handleSubmit(onSuccess)}
      >
        <h3 className="reviews__form-title">Leave a review</h3>

        <div className="reviews__stars-input">
          <input
            className="reviews__rating-input"
            type="text"
            placeholder="1-5"
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                return;
              }

              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            {...register("rating", {
              required: true,
              min: 1,
              max: 5,
            })}
          />
          <span className="reviews__rating-label">rating</span>
        </div>

        <textarea
          className="reviews__textarea"
          placeholder="Write your experience..."
          {...register("comment", {
            required: true,
            minLength: 1,
          })}
        ></textarea>

        <button className="reviews__submit" disabled={!isValid}>
          Submit review
        </button>
      </form>

      <div className="reviews__list">
        {reviews.map((review) => {
          const date = new Date(review.created_at);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear());
          const rating = review.rating;

          return (
            <div className="review" key={review.id}>
              <div className="review__header">
                <div className="review__user">
                  <p className="review__name">
                    {review.first_name} {review.last_name}
                  </p>
                  <p className="review__date">
                    {year}-{month}-{day}
                  </p>
                </div>
                <div className="review__stars">
                  {Array(5).fill(0).map((num, i) => <img className="review__star" key={i} src={i >= rating ? starEmpty : starFilled} />)}
                </div>
              </div>

              <p className="review__text">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ListingReviews;