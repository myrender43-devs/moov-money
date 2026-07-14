// LoanCalculator.jsx - Fixed version
import React, { useState, useEffect } from "react";
import "./LoanCalculator.css";
import { useParams, useNavigate } from "react-router-dom";
import Topheader from "./Topheader";

const LoanCalculator = () => {
  const navigate = useNavigate();
  const { user } = useParams();

  function handleCals() {
    navigate(`/${user}/apply`);
  }

  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Interest rate based on term (example rates)
  const getInterestRate = (term) => {
    if (term <= 6) return 4.0;
    if (term <= 12) return 4.5;
    if (term <= 24) return 5.5;
    if (term <= 36) return 6.5;
    return 8.5;
  };

  // Calculate monthly payment - moved outside useEffect
  const calculatePayment = (amount, term) => {
    const monthlyRate = getInterestRate(term) / 100 / 12;
    const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, term);
    const denominator = Math.pow(1 + monthlyRate, term) - 1;

    if (denominator === 0 || !isFinite(numerator) || !isFinite(denominator)) {
      return 0;
    }

    const payment = numerator / denominator;
    return isFinite(payment) ? payment : 0;
  };

  // Handle initial calculation on mount
  useEffect(() => {
    const initialPayment = calculatePayment(loanAmount, loanTerm);
    setMonthlyPayment(initialPayment);
  }, []); // Empty dependency array - runs once on mount

  // Handle calculations when inputs change using useMemo instead
  const calculatedPayment = React.useMemo(() => {
    return calculatePayment(loanAmount, loanTerm);
  }, [loanAmount, loanTerm]);

  // Update payment only when it actually changes
  useEffect(() => {
    if (Math.abs(calculatedPayment - monthlyPayment) > 0.01) {
      setMonthlyPayment(calculatedPayment);
    }
  }, [calculatedPayment, monthlyPayment]);

  // Alternative: Handle with useCallback and manual calculation on change
  const handleLoanAmountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1000 && value <= 1000000) {
      setLoanAmount(value);
      // Calculate immediately instead of waiting for useEffect
      const newPayment = calculatePayment(value, loanTerm);
      setMonthlyPayment(newPayment);
    }
  };

  const handleTermChange = (term) => {
    setLoanTerm(term);
    // Calculate immediately instead of waiting for useEffect
    const newPayment = calculatePayment(loanAmount, term);
    setMonthlyPayment(newPayment);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CFA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPayment = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CFA",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="loan-calculator-container">
      {/* <img src="/cabslogo.jpeg" alt="cabs" /> */}
      {/* Header Section */}
      <Topheader />
      <div className="calculator-header">
        <h1>
          Faites approuver votre prêt{" "}
          <span className="fast-text">rapidement</span>
        </h1>
        <p className="subtitle">
          Approbation rapide • Taux compétitifs • Conditions flexibles
        </p>
      </div>

      <div className="calculator-content">
        {/* Left Column - Calculator */}
        <div className="calculator-section">
          <h2 className="section-title">Calculateur de prêt</h2>

          {/* Loan Amount Control */}
          <div className="calculator-control">
            <label className="control-label">Montant du prêt</label>
            <div className="amount-display">{formatCurrency(loanAmount)}</div>
            <div className="slider-container">
              <input
                type="range"
                min="100000"
                max="1000000"
                step="1000"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                className="amount-slider"
              />
              <div className="slider-labels">
                <span>CFA 100,000</span>
                <span>CFA 1,000,000</span>
              </div>
            </div>
          </div>

          {/* Loan Term Control */}
          <div className="calculator-control">
            <label className="control-label">Loan Term</label>
            <div className="term-display">{loanTerm} mois </div>
            <div className="term-buttons">
              {[6, 12, 24, 36, 48, 60].map((term) => (
                <button
                  key={term}
                  className={`term-button ${loanTerm === term ? "active" : ""}`}
                  onClick={() => handleTermChange(term)}
                >
                  {term} mois
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Payment Display */}
          <div className="payment-display">
            <div className="payment-label">Paiement mensuel</div>
            <div className="payment-amount">
              {formatPayment(monthlyPayment)}
            </div>
            <div className="interest-rate">
              Taux d'intérêt : {getInterestRate(loanTerm).toFixed(1)}% (TAEG)
            </div>
          </div>

          {/* Apply Now Button */}
          <button className="apply-button" onClick={handleCals}>
            Postulez dès maintenant
          </button>
        </div>

        {/* Right Column - Features */}
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <h3 className="feature-title">Approbation rapide</h3>
              <p className="feature-desc">Dans les 24 heures</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <div className="feature-content">
              <h3 className="feature-title">Tarifs bas</h3>
              <p className="feature-desc">À partir de 8 %</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <h3 className="feature-title">Sécurisé</h3>
              <p className="feature-desc">Sécurité de niveau bancaire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
