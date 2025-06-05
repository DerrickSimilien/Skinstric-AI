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
  const [selectedLabel, setSelectedLabel] = useState(null);

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
        setTimeout(() => {
          setLoading(false);
        }, 7000);
      }
    };

    fetchDemographics();
  }, [userData]);

  if (loading) {
    return (
      <div className="loading-screen2">
        <div className="spinner2"></div>
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
  const currentTop = selectedLabel
    ? { label: selectedLabel, confidence: Math.round(currentData[selectedLabel] * 100) }
    : getTopPrediction(currentData, activeCategory);

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
              onClick={() => {
                setActiveCategory(key);
                setSelectedLabel(null);
              }}
            >
              <div className="value">{getTopPrediction(value.data, key).label}</div>
              <div className="label">{value.label}</div>
            </div>
          ))}
        </div>

        {/* CENTER SECTION */}
        <div className="summary-center boxed">
          <div
  className="main-prediction"
  style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "20px",
    fontWeight: "600",
    textTransform: "lowercase",
  }}
>
  {activeCategory === "age" ? `${currentTop.label} y.o.` : currentTop.label}
</div>

         <div className="progress-ring">
  <svg className="ring" width="350" height="350">
    <circle
      className="ring-background"
      stroke="#e6e6e6"
      strokeWidth="10"
      fill="transparent"
      r="150"
      cx="175"
      cy="175"
    />
    <circle
      className="ring-progress"
      stroke="black"
      strokeWidth="10"
      fill="transparent"
      r="150"
      cx="175"
      cy="175"
      strokeDasharray="942"
      strokeDashoffset={942 - (currentTop.confidence / 100) * 942}
      strokeLinecap="round"
      style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
    />
  </svg>
  <div
    className="percentage-text"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "30px",
      fontWeight: "bold",
    }}
  >
    {currentTop.confidence}%
  </div>
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
                  className={`confidence-item ${label === currentTop.label ? "active" : ""}`}
                  onClick={() => setSelectedLabel(label)}
                  style={{ cursor: "pointer" }}
                >
                  <span>◇ {label}</span>
                  <span>{Math.round(value * 100)}%</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* FIXED BOTTOM LEFT BACK BUTTON */}
      <button className="demographics-back-btn fixed-bottom-left" onClick={() => navigate(-1)}>
        <div className="diamond">
          <span className="arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </button>

      {/* FIXED BOTTOM RIGHT FOOTER BUTTONS */}
      <div className="demographics-footer-buttons">
        <button className="demographics-btn" onClick={() => window.location.reload()}>
          RESET
        </button>
        <button className="demographics-btn">CONFIRM</button>
      </div>
    </div>
  );
};

export default DemographicsSummary;
