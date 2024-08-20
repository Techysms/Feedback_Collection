import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit, faFileAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the required icons
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div id="admin-container">
      <div id="adbody">
        <h1 id="adhead">WELCOME ADMIN</h1>
        <div id='adbody1'>
          <button id="as" onClick={() => navigate("/aform")}>
            <FontAwesomeIcon icon={faPlus} id='icon1' /> ADD ACADEMIC YEAR
          </button>
          <button id="as" onClick={() => navigate("/dlt")}>
            <FontAwesomeIcon icon={faTrash} id='icon1' /> DELETE
          </button>
          <button id="as" onClick={() => navigate("/upd")}>
            <FontAwesomeIcon icon={faEdit} id='icon1' /> UPDATE
          </button>
          <button id="as" onClick={() => navigate("/report")}>
            <FontAwesomeIcon icon={faFileAlt} id='icon1' /> GENERATE REPORT
          </button>
        </div>
        <div id='adbody2'>
          <button id="et" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faSignOutAlt} id='icon1' /> EXIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
