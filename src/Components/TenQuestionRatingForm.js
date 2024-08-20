import React, { useState, useEffect } from 'react';
import Rating from 'react-rating-stars-component';
import './Tenquestions.css';
import { useNavigate } from 'react-router-dom';
import { db } from './config/firebase-config';
import { semester } from "../Helper/Context";
import { ac_year } from '../Helper/Context';
import { subz } from '../Helper/Context';
import { getDocs, collection, addDoc, query, where, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';

export function TenQuestionRatingForm() {
  const navigate = useNavigate();
  const questionList = [
    '1. Course is relevant for the programme.',
    '2. Course content is adequate in relation to the course Outcomes.',
    '3. Allocation of the credits to the course is appropriate.',
    '4. Units/Sections inthe syllabus are properly  sequenced.',
    '5. Course Reference Books are adequate.',
    '6. Teacher speaks clearly and audibly.',
    '7. Teacher provide examples of concepts/principles / explanations are clear and effective.',
    '8. Teacher writes and draws legibly.',
    "9. Teacher's pace and level of instruction are suited to the needs of students.",
    '10. Teacher offers assistancce and counselling to the needy students.',
    '11. Teacher asks questions to promote interaction and reflective thinking.',
    '12. Teacher encourages questioning / raising doubts by students and answers them well.',
    '13. Course improved my ability to formulate, analyze and solve problems ',
    '14. Teacher encourages, compliments and praises originality and creativity displayed by the student.',
    '15. Teacher is courteous and impartial in dealing with the student',
    '16. Teacher engages classes regularly and maintains descipline.',
    '17. Course enabled understanding of the concepts in relating theory to practice',
    '18. Course is intellectually stimulating',
    '19. Teacher’s marking of scripts is fair and impartial',
    '20. Course evaluation scheme is designed well', 
  ];

  const [ratings, setRatings] = useState(Array(questionList.length).fill(0));
  const [allQuestionsRated, setAllQuestionsRated] = useState(true);
  const { sem, setSem } = useContext(semester);
  const { yr, setYear } = useContext(ac_year);
  const { sub, setSub } = useContext(subz);

  useEffect(() => {
    setAllQuestionsRated(ratings.every((rating) => rating !== 0));
  }, [ratings]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(ratings); // Array of student ratings for all questions

    if (!allQuestionsRated) {
      return;
    }

    const getRef = collection(db, "rating");
    const existingDocs = await getDocs(
      query(
        collection(db, "rating"),
        where("year", "==", yr),
        where("semester", "==", sem),
        where("subject", "==", sub)
      )
    );

    if (existingDocs.size > 0) {
      const doc = existingDocs.docs[0];
      const existingRatings = doc.data();
      const updatedRatings = {};
      for (let i = 0; i < questionList.length; i++) {
        const questionKey = `question${i + 1}`;
        const newAverage = (
          (existingRatings[questionKey] * existingRatings.count + ratings[i]) /
          (existingRatings.count + 1)
        ).toFixed(2);
        updatedRatings[questionKey] = newAverage;
      }
      updatedRatings.count = existingRatings.count + 1;
      await updateDoc(doc.ref, updatedRatings);
    } else {
      const data = {
        year: yr,
        semester: sem,
        subject: sub,
        count: 1,
      };
      for (let i = 0; i < questionList.length; i++) {
        const questionKey = `question${i + 1}`;
        data[questionKey] = ratings[i];
      }
      await addDoc(getRef, data);
    }

    // Check if all subjects are rated
    const allSubjectsRated = await checkIfAllSubjectsRated();
    if (allSubjectsRated) {
      // Navigate to the previous page of the semester
      navigate('/semester');
    } else {
      // Navigate to the previous page
      navigate('/');
    }
  };

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const checkIfAllSubjectsRated = async () => {
    const ratingRef = collection(db, "rating");
    const snapshot = await getDocs(
      query(
        ratingRef,
        where("year", "==", yr),
        where("semester", "==", sem)
      )
    );
    return snapshot.docs.every(doc => doc.data().count > 0);
  };

  return (
    <form id="fques" onSubmit={handleSubmit}>
      {questionList.map((question, index) => (
        <div id={`qbox-${index}`} key={index}>
          <p id="qlist">{question}</p>
          <Rating
            classNames="star-rate"
            id={`rating-${index}`}
            emptySymbol={<span>Strongly Disagree</span>}
            fullSymbol={<span>Strongly Agree</span>}
            fractions={2}
            onChange={(value) => handleRatingChange(index, value)}
          />
        </div>
      ))}
      <button type="submit" disabled={!allQuestionsRated} id="qq" className='.question-btn'>
        Submit
      </button>
    </form>
  );
}
