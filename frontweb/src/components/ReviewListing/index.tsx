import StarIcon from 'assets/images/star-icon.png';
import { Review } from 'types/review';

import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewListing = (reviews: Props) => {
  return (
    <>
      {reviews.reviews.map((item) => (
        <div className="list-item-container" key={item.id}>
          <div className="name-user-review">
            <img src={StarIcon} alt="" />
            <label className="lbl-username">{item.user.name}</label>
          </div>
          <div className="review-text">
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewListing;
