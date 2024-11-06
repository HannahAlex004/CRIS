import React, { useState } from "react";
import axios from "axios";
import './Cases.css';

const Cases = () => {
    const [caseName, setCaseName] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const [dateReported, setDateReported] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/cases", {
                caseName,
                caseDescription,
                dateReported,
            });
            alert("Case added successfully");
            setCaseName("");
            setCaseDescription("");
            setDateReported("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Case</h2>
            <label>Case Name:</label>
            <input
                type="text"
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                required
            />
            <label>Case Description:</label>
            <textarea
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                required
            />
            <label>Date Reported:</label>
            <input
                type="date"
                value={dateReported}
                onChange={(e) => setDateReported(e.target.value)}
                required
            />
            <button type="submit">Add Case</button>
        </form>
    );
};

export default Cases;
