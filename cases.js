import React, { useState, useEffect } from "react";
import axios from "axios";
import './Cases.css'; // Import the new CSS file

const Cases = () => {
    const [caseName, setCaseName] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const [dateReported, setDateReported] = useState("");
    const [userId, setUserId] = useState(""); // New state for userId
    const [cases, setCases] = useState([]); // State to store cases

    // Fetch all cases from the backend when the component mounts
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get("http://localhost:3001/cases");
                setCases(response.data);  // Update state with fetched cases
            } catch (err) {
                console.error("Error fetching cases:", err);
            }
        };
        fetchCases();
    }, []); // Empty dependency array to run only once when component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/cases", {
                caseName,
                caseDescription,
                dateReported,
                userId,  // Send the userId along with the case data
            });
            alert("Case added successfully");
            setCaseName("");
            setCaseDescription("");
            setDateReported("");
            setUserId("");  // Reset the userId field
            // Re-fetch cases after adding a new one
            const response = await axios.get("http://localhost:3001/cases");
            setCases(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="cases-container">
            <form onSubmit={handleSubmit} className="case-form">
                <h2 className="form-title">Add New Case</h2>
                <div className="form-group">
                    <label>Case Name:</label>
                    <input
                        type="text"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Case Description:</label>
                    <textarea
                        value={caseDescription}
                        onChange={(e) => setCaseDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date Reported:</label>
                    <input
                        type="date"
                        value={dateReported}
                        onChange={(e) => setDateReported(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add Case</button>
            </form>

            <h2 className="case-list-title">Case List</h2>
            <table className="case-table">
                <thead>
                    <tr>
                        <th>Case Name</th>
                        <th>Case Description</th>
                        <th>Date Reported</th>
                        <th>User ID</th> {/* Add column for User ID */}
                    </tr>
                </thead>
                <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem.id}>
                            <td>{caseItem.caseName}</td>
                            <td>{caseItem.caseDescription}</td>
                            <td>{caseItem.dateReported}</td>
                            <td>{caseItem.userId}</td> {/* Display the User ID */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cases;
