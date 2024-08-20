import React from "react";
import "./Delete.css"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ac_year } from "../Helper/Context";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import firebase from "firebase/app";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config/firebase-config";
import { doc } from "firebase/firestore";
import { semester } from "../Helper/Context";
function Delete() {
  const [selectedOption, setSelectedOption] = useState("");
  const [yearList, setYearList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const [fldata, setfl] = useState([]);

  const yearCollection = collection(db, "academic_year");
  const yearCollectionRef = collection(db, "academic_year");

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage("");
      }, 3000); // Hide message after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [showNotification]);


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

  const deleteYear = async () => {
    try {
      const q = query(
        collection(db, "academic_year"),
        where("year", "==", selectedOption)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
        getYearList();
      });
      console.log("Documents successfully deleted!");
      setShowNotification(true);
      setNotificationMessage("Academic year is deleted successfully!");
      getYearList();
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  return (
    <div id="ob-del">
      <div id="xz-del">
        <h3 id="aq-del">DELETE ACADEMIC YEAR</h3>
        <select
          id="sel-del"
          onChange={(e) => setSelectedOption(e.target.value)}
          required
        >
          <option value="">---select--- </option>
          {yearList.map((movie) => (
            <option value={movie.year}>{movie.year}</option>
          ))}
        </select>
        <br />
        <button id="dcb" type="submit" onClick={() => deleteYear()}>
          DELETE
        </button>
      </div>
      {showNotification && (
  <div className="notification">
  <span id='noti'>{notificationMessage}</span>
  <FontAwesomeIcon
    icon={faTimes}
    className="close-btn"
    onClick={() => setShowNotification(false)}
  />
</div>

)}
    </div>
  );
}
export default Delete;
