import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

// Helper function to find top prediction
const getTopPrediction = (obj, label = "unknown") => {
  if (!obj || typeof obj !== "object") {
    console.warn(`⚠️ No prediction data for ${label}`);
    return { label: "N/A", confidence: 0 };
  }
  const top = Object.entries(obj).sort((a, b) => b[1] - a[1])[0];
  return { label: top[0], confidence: Math.round(top[1] * 100) };
};

const DemographicsSummary = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [demographics, setDemographics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("race");

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

  useEffect(() => {
    const fetchDemographics = async () => {
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
        console.log("🧪 Final demographics from API:", phaseTwoData.data);
        setDemographics(phaseTwoData.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching A.I. results:", error);
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

  const categories = {
    race: { label: "RACE", data: demographics.race },
    age: { label: "AGE", data: demographics.ageRange || demographics.age },
    gender: { label: "SEX", data: demographics.gender },
  };

  const currentData = categories[activeCategory].data;
  const currentTop = getTopPrediction(currentData, activeCategory);

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
          {Object.entries(categories).map(([key, value]) => (
            <div
              key={key}
              className={`summary-box boxed ${activeCategory === key ? "active" : ""}`}
              onClick={() => setActiveCategory(key)}
            >
              <div className="value">{getTopPrediction(value.data, key).label}</div>
              <div className="label">{value.label}</div>
            </div>
          ))}
          <button className="btn back-btn" onClick={() => navigate(-1)}>
            ◀ BACK
          </button>
        </div>

        {/* CENTER SECTION */}
        <div className="summary-center boxed">
          <div className="main-prediction">{currentTop.label}</div>
          <div className="progress-ring">
            <svg className="ring" width="120" height="120">
              <circle
                className="ring-background"
                stroke="#e6e6e6"
                strokeWidth="10"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
              <circle
                className="ring-progress"
                stroke="black"
                strokeWidth="10"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
                strokeDasharray="314"
                strokeDashoffset={314 - (currentTop.confidence / 100) * 314}
                strokeLinecap="round"
              />
            </svg>
            <div className="percentage-text">{currentTop.confidence}%</div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="summary-right boxed">
          <div className="confidence-header">
            <span>{categories[activeCategory].label}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <ul className="confidence-list">
            {currentData &&
              Object.entries(currentData).map(([label, value]) => (
                <li
                  key={label}
                  className={`confidence-item ${
                    label === currentTop.label ? "active" : ""
                  }`}
                >
                  <span>◇ {label}</span>
                  <span>{Math.round(value * 100)}%</span>
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
