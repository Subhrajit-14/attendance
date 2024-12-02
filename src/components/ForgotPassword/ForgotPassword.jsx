import React, { useState } from "react";
import "./forgotpass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const dummyEmails = ["user@1.com", "user@2.com", "user@3.com", "user@4.com"];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!dummyEmails.includes(email)) {
      console.log("Email not found");
      return;
    }
    setIsEmailVerified(true);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /\d/;
    const special = /[!@#$%^&*]/;
    const length = /.{8,}/;

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match. Please try again!");
      return;
    }
    if (
      !lowerValidated ||
      !upperValidated ||
      !numberValidated ||
      !specialValidated ||
      !lengthValidated
    ) {
      console.log("Password does not meet the required criteria.");
      return;
    }
    console.log("Password reset successful for email:", email);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsEmailVerified(false);
  };

  return (
    <div className="forgot-container">
      <h1 className="heading">Forgot Password</h1>
      <p className="subheading">
        Enter your email below to reset your password.
      </p>

      {!isEmailVerified ? (
        <form onSubmit={handleEmailSubmit} className="form">
          <div className="input-group">
            <label className="label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="form">
          <div className="input-group">
            <label className="label">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Enter your new password"
              required
              className="input"
            />
            <div className="validation-checks">
              <p className={lowerValidated ? "valid" : "invalid"}>
                {lowerValidated ? "✔" : "X"} Contains a lowercase letter
              </p>
              <p className={upperValidated ? "valid" : "invalid"}>
                {upperValidated ? "✔" : "X"} Contains an uppercase letter
              </p>
              <p className={numberValidated ? "valid" : "invalid"}>
                {numberValidated ? "✔" : "X"} Contains a number
              </p>
              <p className={specialValidated ? "valid" : "invalid"}>
                {specialValidated ? "✔" : "X"} Contains a special character
              </p>
              <p className={lengthValidated ? "valid" : "invalid"}>
                {lengthValidated ? "✔" : "X"} At least 8 characters long
              </p>
            </div>
          </div>

          <div className="input-group">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              className="input"
            />
          </div>
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
