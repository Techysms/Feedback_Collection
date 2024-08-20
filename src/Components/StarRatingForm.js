// For StarRatingForm component
import React, { useState } from 'react';

const StarRatingForm = () => {
  const [ratings, setRatings] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
    question8: null,
    question9: null,
    question10: null,
    question11: null,
    question12: null,
    question13: null,
    question14: null,
    question15: null,
    question16: null,
    question17: null,
    question18: null,
    question19: null,
    question20: null
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(ratings); // You can do something else with the ratings here
  };

  const handleRatingChange = (event, question) => {
    setRatings({ ...ratings, [question]: parseInt(event.target.value) });
  };

  const RatingOptions = ({ question }) => {
    return (
      <div>
        <label htmlFor={`${question}-strongly-agree`}>
          <input
            type="radio"
            id={`${question}-strongly-agree`}
            name={question}
            value="5"
            onChange={(event) => handleRatingChange(event, question)}
          />
          Strongly Agree
        </label>
        <label htmlFor={`${question}-agree`}>
          <input
            type="radio"
            id={`${question}-agree`}
            name={question}
            value="4"
            onChange={(event) => handleRatingChange(event, question)}
          />
          Agree
        </label>
        <label htmlFor={`${question}-neutral`}>
          <input
            type="radio"
            id={`${question}-neutral`}
            name={question}
            value="3"
            onChange={(event) => handleRatingChange(event, question)}
          />
          Neutral
        </label>
        <label htmlFor={`${question}-disagree`}>
          <input
            type="radio"
            id={`${question}-disagree`}
            name={question}
            value="2"
            onChange={(event) => handleRatingChange(event, question)}
          />
          Disagree
        </label>
        <label htmlFor={`${question}-strongly-disagree`}>
          <input
            type="radio"
            id={`${question}-strongly-disagree`}
            name={question}
            value="1"
            onChange={(event) => handleRatingChange(event, question)}
          />
          Strongly Disagree
        </label>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <RatingOptions question="Question 1" />
      <RatingOptions question="Question 2" />
      <RatingOptions question="Question 3" />
      <RatingOptions question="Question 4" />
      <RatingOptions question="Question 5" />
      <RatingOptions question="Question 6" />
      <RatingOptions question="Question 7" />
      <RatingOptions question="Question 8" />
      <RatingOptions question="Question 9" />
      <RatingOptions question="Question 10" />
      <RatingOptions question="Question 11" />
      <RatingOptions question="Question 12" />
      <RatingOptions question="Question 13" />
      <RatingOptions question="Question 14" />
      <RatingOptions question="Question 15" />
      <RatingOptions question="Question 16" />
      <RatingOptions question="Question 17" />
      <RatingOptions question="Question 18" />
      <RatingOptions question="Question 19" />
      <RatingOptions question="Question 20" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default StarRatingForm;





























































































// import React, { useState } from 'react';

// const StarRatingForm = () => {
//   const [ratings, setRatings] = useState({
//     question1: null,
//     question2: null,
//     question3: null,
//     question4: null,
//     question5: null,
//     question6: null,
//     question7: null,
//     question8: null,
//     question9: null,
//     question10: null,
//     question11: null,
//     question12: null,
//     question13: null,
//     question14: null,
//     question15: null,
//     question16: null,
//     question17: null,
//     question18: null,
//     question19: null,
//     question20: null
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(ratings); // You can do something else with the ratings here
//   };

//   const handleRatingChange = (event, question) => {
//     setRatings({ ...ratings, [question]: parseInt(event.target.value) });
//   };



//   const StarRating = ({ question }) => {
//     const stars = [1, 2, 3, 4, 5];
  
//     return (
//       <div>
//         <label htmlFor={question}>{question}:</label>
//         <select id={question} onChange={(event) => handleRatingChange(event, question)}>
//           <option value="">--Select rating--</option>
//           {stars.map((star) => (
//             <option key={star} value={star}>
//               {'★'.repeat(star)}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   };

  

//   return (
//     <form onSubmit={handleSubmit}>
//       <StarRating question="Question 1" />
//       <StarRating question="Question 2" />
//       <StarRating question="Question 3" />
//       <StarRating question="Question 4" />
//       <StarRating question="Question 5" />
//       <StarRating question="Question 6" />
//       <StarRating question="Question 7" />
//       <StarRating question="Question 8" />
//       <StarRating question="Question 9" />
//       <StarRating question="Question 10" />
//       <StarRating question="Question 11" />
//       <StarRating question="Question 12" />
//       <StarRating question="Question 13" />
//       <StarRating question="Question 14" />
//       <StarRating question="Question 15" />
//       <StarRating question="Question 16" />
//       <StarRating question="Question 17" />
//       <StarRating question="Question 18" />
//       <StarRating question="Question 19" />
//       <StarRating question="Question 20" />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default StarRatingForm;















































































// import React, { useState } from 'react';

// const StarRatingForm = () => {
//   const [ratings, setRatings] = useState({
//     question1: null,
//     question2: null,
//     question3: null,
//     question4: null,
//     question5: null,
//     question6: null,
//     question7: null,
//     question8: null,
//     question9: null,
//     question10: null
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(ratings); // You can do something else with the ratings here
//   };

//   const handleRatingChange = (event, question) => {
//     setRatings({ ...ratings, [question]: parseInt(event.target.value) });
//   };

//   const StarRating = ({ question }) => {
//     const stars = [1, 2, 3, 4, 5];

//     return (
//       <div>
//         <label htmlFor={question}>{question}:</label>
//         <select id={question} onChange={(event) => handleRatingChange(event, question)}>
//           <option value="">--Select rating--</option>
//           {stars.map((star) => (
//             <option key={star} value={star}>
//               {'★'.repeat(star)}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <StarRating question="Question 1" />
//       <StarRating question="Question 2" />
//       <StarRating question="Question 3" />
//       <StarRating question="Question 4" />
//       <StarRating question="Question 5" />
//       <StarRating question="Question 6" />
//       <StarRating question="Question 7" />
//       <StarRating question="Question 8" />
//       <StarRating question="Question 9" />
//       <StarRating question="Question 10" />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default StarRatingForm;










  // const StarRating = ({ question }) => {
  //   return (
  //     <div>
  //       <label>{question}:</label>
  //       <div>
  //         <input type="radio" id={`${question}-strongly-agree`} name={question} value="Strongly Agree" onChange={(event) => handleRatingChange(event, question)} />
  //         <label htmlFor={`${question}-strongly-agree`}>Strongly Agree</label>
  //       </div>
  //       <div>
  //         <input type="radio" id={`${question}-agree`} name={question} value="Agree" onChange={(event) => handleRatingChange(event, question)} />
  //         <label htmlFor={`${question}-agree`}>Agree</label>
  //       </div>
  //       <div>
  //         <input type="radio" id={`${question}-neutral`} name={question} value="Neutral" onChange={(event) => handleRatingChange(event, question)} />
  //         <label htmlFor={`${question}-neutral`}>Neutral</label>
  //       </div>
  //       <div>
  //         <input type="radio" id={`${question}-disagree`} name={question} value="Disagree" onChange={(event) => handleRatingChange(event, question)} />
  //         <label htmlFor={`${question}-disagree`}>Disagree</label>
  //       </div>
  //       <div>
  //         <input type="radio" id={`${question}-strongly-disagree`} name={question} value="Strongly Disagree" onChange={(event) => handleRatingChange(event, question)} />
  //         <label htmlFor={`${question}-strongly-disagree`}>Strongly Disagree</label>
  //       </div>
  //     </div>
  //   );
  // };