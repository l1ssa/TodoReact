import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const Rate = () => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);

  const ratings = [
    { value: 1, label: 'Ужасно' },
    { value: 2, label: 'Плохо' },
    { value: 3, label: 'Удовлетворительно' },
    { value: 4, label: 'Хорошо' },
    { value: 5, label: 'Отлично' },
  ];

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Пожалуйста, выберите оценку:</h1>
      <div style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        {ratings.map((star, index) => {
          return (
            <span
              key={index}
              onClick={() => setRating(star.value)}
              onMouseEnter={() => setHoverRating(star.value)}
              onMouseLeave={() => setHoverRating(null)}
              style={{
                cursor: 'pointer',
                fontSize: '2rem',
                color: star.value <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9',
                marginRight: '5px'
              }}
            >
              {star.value <= (hoverRating || rating) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg>
              )}
            </span>
          );
        })}
      </div>
      {rating && <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{ratings.find((star) => star.value === rating).label}</p>}
    </Container>
  );
};

export default Rate;


