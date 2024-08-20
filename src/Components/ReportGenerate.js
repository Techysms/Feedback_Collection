import React, { useEffect, useState } from "react";
import { db } from './config/firebase-config';
import { getDocs, collection, query, where } from "firebase/firestore";
import PopupWindow from "./PopupWindow";
import * as XLSX from 'xlsx';


export const ReportGenerate = () => {
    const [options, setOptions] = useState([]);
    const [formCompleted, setFormCompleted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [academicYear, setAcademicYear] = useState('');
    const [semester, setSemester] = useState('');
    const [sub, setSub] = useState('');
    const [averageValues, setAverageValues] = useState([]);
    const [yearList, setYearList] = useState([]);

    const questionList = [
        'Course is relevant for the programme.',
        'Course content is adequate in relation to the course Outcomes.',
        'Allocation of the credits to the course is appropriate.',
        'Units/Sections in the syllabus are properly sequenced.',   
        'Course Reference Books are adequate.',
        'Teacher speaks clearly and audibly.',
        'Teacher provide examples of concepts/principles / explanations are clear and effective.',
        'Teacher writes and draws legibly.',
        "Teacher's pace and level of instruction are suited to the needs of students.",
        'Teacher offers assistance and counselling to the needy students.',
        'Teacher asks questions to promote interaction and reflective thinking.',
        'Teacher encourages questioning / raising doubts by students and answers them well.',
        'Course improved my ability to formulate, analyze and solve problems ',
        'Teacher encourages, compliments and praises originality and creativity displayed by the student.',
        'Teacher is courteous and impartial in dealing with the student',
        'Teacher engages classes regularly and maintains discipline.',
        'Course enabled understanding of the concepts in relating theory to practice',
        'Course is intellectually stimulating',
        'Teacher’s marking of scripts is fair and impartial',
        'Course evaluation scheme is designed well',
    ];

    const yearCollectionRef = collection(db, "academic_year");

    const getYearList = async () => {
        try {
            const data = await getDocs(yearCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setYearList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getYearList();
    }, []);

    useEffect(() => {
        const isFormCompleted =
            academicYear !== '' &&
            semester !== '' &&
            sub !== '';
        setFormCompleted(isFormCompleted);
    }, [academicYear, semester, sub]);

    const handleUpdate = event => {
        const soption = event.target.value;
        setSemester(soption);
        const q = query(collection(db, 'academic_year'), where('year', '==', academicYear));
        getDocs(q)
            .then(querySnapshot => {
                const optionsData = querySnapshot.docs.map(doc => doc.data()[soption]);
                setOptions(optionsData);
            })
            .catch(error => {
                console.log('Error getting documents:', error);
            });
    }

    const downloadExcel = async () => {
        const ratingCollectionRef = collection(db, "rating");
        const questionAverages = [];
        const partSize = 5; // Number of questions in each part
    
        // Calculate averages for each question
        for (let i = 0; i < questionList.length; i++) {
            const questionKey = `question${i + 1}`;
            const q = query(ratingCollectionRef, where("year", "==", academicYear), where("semester", "==", semester));
            const querySnapshot = await getDocs(q);
            let total = 0;
            let count = 0;
            querySnapshot.forEach(doc => {
                total += doc.data()[questionKey] || 0;
                count++;
            });
            const average = count > 0 ? total / count : 0;
            questionAverages.push({ question: questionList[i], average: average.toFixed(2) });
        }
    
        // Prepare data for the first sheet (single question averages)
        const singleQuestionData = questionAverages.map((qa, index) => ({
            "Serial No.": index + 1,
            "Question": qa.question,
            "Average": qa.average
        }));

    
        // Split questions into parts and calculate part averages
        const parts = [];
        for (let i = 0; i < questionList.length; i += partSize) {
            const partQuestions = questionAverages.slice(i, i + partSize);
            const partAverage = partQuestions.reduce((acc, curr) => acc + parseFloat(curr.average), 0) / partSize;
            parts.push({ "Part Number": Math.floor(i / partSize) + 1, "Average": partAverage.toFixed(2) });
        }

        const partNames = {
            1: 'PLANNING AND ORGANISATION',
            2: 'PRESENTATION / COMMUNICATION',
            3: 'STUDENT\'S PARTICIPATION',
            4: 'CLASS MANAGEMENT / ASSESSMENT OF STUDENTS',
        };
    
        // Replace part numbers with names
        const partsDataWithName = parts.map(part => ({
            "Categories": partNames[part["Part Number"]],
            "Average": part["Average"],
            "Percentage": (parseFloat(part["Average"]) * 20).toFixed(2)
        }));


        // Prepare data for the second sheet (part averages) with names
        const partsDataSheet = XLSX.utils.json_to_sheet(partsDataWithName);
        // const individualRatingsWorksheet = XLSX.utils.json_to_sheet(individualRatingsData);
    
        // Generate Excel file with the two sheets
        const singleQuestionWorksheet = XLSX.utils.json_to_sheet(singleQuestionData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, singleQuestionWorksheet, "Single Question Averages");
        XLSX.utils.book_append_sheet(workbook, partsDataSheet, "Part Averages");
        // XLSX.utils.book_append_sheet(workbook, individualRatingsWorksheet, "Individual Ratings");
        XLSX.writeFile(workbook, `Feedback_${academicYear}_${semester}_${sub}.xlsx`);
    };
    
    
    
    const handleSubmit = (event) => {
        setShowPopup(true);
        event.preventDefault();
    };

    return (
        <div id="ob">
            <div id='nb'>
                <form onSubmit={handleSubmit}>
                <h3 id="hd">REPORT GENERATE FORM</h3>
                    <div className="mb-3">
                        <label htmlFor="academicYear" className="form-label" id='laadd'>ACADEMIC YEAR</label>
                        <select
                    
                            id="sel1"
                            onChange={(e) => setAcademicYear(e.target.value)}
                            required>
                            <option value="">---select--- </option>
                            {yearList.map((movie) => (
                                <option key={movie.id} value={movie.year}>{movie.year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="semester" className="form-label" id='laadd'>SEMESTER</label>
                        <select id='sel1'  value={semester} onChange={handleUpdate} required>
                            <option value="">---select--- </option>
                            <option value="sem1">sem1</option>
                            <option value="sem2">sem2</option>
                            <option value="sem3">sem3</option>
                            <option value="sem4">sem4</option>
                            <option value="sem5">sem5</option>
                            <option value="sem6">sem6</option>
                            <option value="sem7">sem7</option>
                            <option value="sem8">sem8</option>
                        </select>
                        <label className="form-label" id='laadd'>SUBJECT</label>
                        <select id='sel1'  value={sub} onChange={(e) => setSub(e.target.value)} required>
                            <option value="">Select an option</option>
                            {options.map((optionGroup) => optionGroup.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            )))}
                        </select>
                    </div>
                    <div id="btn-div">
                    <input type="button" value="Download Excel"  id="excel-btn" disabled={!formCompleted} onClick={downloadExcel}></input>
                    </div>
                    {showPopup && <PopupWindow y={academicYear} s={semester} ss={sub} />}
                    {/* {averageValues.length > 0 && <BarChart averages={averageValues} />} */}
                </form>
            </div>
        </div>
    );
}
