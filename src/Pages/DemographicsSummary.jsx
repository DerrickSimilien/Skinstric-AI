// ✅ DemographicsSummary.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext"; // ✅ Import context

const DemographicsSummary = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext); // ✅ Access global user data
  const [demographics, setDemographics] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    console.log("👀 Final userData at Demographics:", userData);
  }, [userData]);

  useEffect(() => {
    const fetchDemographics = async () => {
      if (!userData || !userData.name || !userData.location || !userData.nationality || !userData.capturedImage)
     {
        console.error("❌ Missing user data for demographics analysis.");
        setLoading(false);
        return;
      }

      try {
        const phaseOneRes = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userData.name,
              location: userData.location,
              nationality: userData.nationality,
            }),
          }
        );

        const phaseOneData = await phaseOneRes.json();

        const phaseTwoRes = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...phaseOneData,
              image: userData.capturedImage,
            }),
          }
        );

        const phaseTwoData = await phaseTwoRes.json();
        setDemographics(phaseTwoData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching A.I. results:", error);
        setLoading(false);
      }
    };

    fetchDemographics();
  }, [userData]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1 className="ripple-text">ANALYZING YOUR RESULTS...</h1>
      </div>
    );
  }

  if (!demographics) {
    return (
      <div className="loading-screen">
        <h1>⚠️ Unable to load results. Please try again.</h1>
      </div>
    );
  }

  return (
    <div className="demographics-page">
      <div className="left-panel">
        <div className="category">
          <div className="label">RACE</div>
          <div className="value">{demographics?.race || "N/A"}</div>
        </div>
        <div className="category">
          <div className="label">AGE</div>
          <div className="value">{demographics?.ageRange || "N/A"}</div>
        </div>
        <div className="category">
          <div className="label">SEX</div>
          <div className="value">{demographics?.gender || "N/A"}</div>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>◀ BACK</button>
      </div>

      <div className="center-panel">
        <h2>{demographics?.race || demographics?.ageRange || demographics?.gender || "Summary"}</h2>
        <div className="confidence-circle">
          <span>{demographics?.confidence || 0}%</span>
        </div>
      </div>

      <div className="right-panel">
        <h4>RACE</h4>
        <ul>
          {demographics?.confidenceBreakdown?.map((item, index) => (
            <li key={index}>
              <span>{item.label}</span>
              <span>{item.confidence}%</span>
            </li>
          ))}
        </ul>
        <div className="btn-row">
          <button className="reset-btn" onClick={() => window.location.reload()}>RESET</button>
          <button className="confirm-btn">CONFIRM</button>
        </div>
      </div>
    </div>
  );
};

export default DemographicsSummary;
