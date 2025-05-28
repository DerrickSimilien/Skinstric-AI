import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const DemographicsSummary = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [demographics, setDemographics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: Log the userData
  useEffect(() => {
    console.log("👀 Final userData at Demographics:\n", JSON.stringify(userData, null, 2));
  }, [userData]);

  // ✅ Redirect if required data is missing
  useEffect(() => {
    if (
      !userData.name ||
      !userData.location ||
      !userData.nationality ||
      !userData.capturedImage
    ) {
      console.warn("🚫 Missing data — redirecting to /imageupload");
      navigate("/imageupload");
    }
  }, [userData, navigate]);

  // ✅ Fetch AI demographics if data is complete
  useEffect(() => {
    const fetchDemographics = async () => {
      if (
        !userData ||
        !userData.name ||
        !userData.location ||
        !userData.nationality ||
        !userData.capturedImage
      ) {
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

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <h1 className="ripple-text">ANALYZING YOUR RESULTS...</h1>
      </div>
    );
  }

  // ⚠️ If API fails
  if (!demographics) {
    return (
      <div className="loading-screen">
        <h1>⚠️ Unable to load results. Please try again.</h1>
      </div>
    );
  }

  // ✅ Final UI
  return (
    <div className="summary-wrapper">
      <header className="summary-header">
        <p className="section-label">A.I. ANALYSIS</p>
        <h1 className="main-title">DEMOGRAPHICS</h1>
        <p className="subtitle">PREDICTED RACE & AGE</p>
      </header>

      <div className="summary-grid">
        {/* LEFT COLUMN */}
        <div className="summary-left">
          <div className="summary-box">
            <div className="value">{demographics?.race || "N/A"}</div>
            <div className="label">RACE</div>
          </div>
          <div className="summary-box">
            <div className="value">{demographics?.ageRange || "N/A"}</div>
            <div className="label">AGE</div>
          </div>
          <div className="summary-box">
            <div className="value">{demographics?.gender || "N/A"}</div>
            <div className="label">SEX</div>
          </div>
          <button className="btn back-btn" onClick={() => navigate(-1)}>
            ◀ BACK
          </button>
        </div>

        {/* CENTER */}
        <div className="summary-center">
          <div className="main-prediction">{demographics?.race}</div>
          <div className="circle-container">
            <div className="circle">
              <div className="percentage">{demographics?.confidence || 0}%</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="summary-right">
          <div className="confidence-header">
            <span>RACE</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <ul className="confidence-list">
            {demographics?.confidenceBreakdown?.map((item, index) => (
              <li
                key={index}
                className={`confidence-item ${
                  item.label === demographics?.race ? "active" : ""
                }`}
              >
                <span>◇ {item.label}</span>
                <span>{item.confidence}%</span>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button className="btn reset-btn" onClick={() => window.location.reload()}>
              RESET
            </button>
            <button className="btn confirm-btn">CONFIRM</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicsSummary;
