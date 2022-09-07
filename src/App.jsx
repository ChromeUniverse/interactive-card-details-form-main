import React, { useState } from "react";

// assets
import cardLogo from "./assets/card-logo.svg";
import iconComplete from "./assets/icon-complete.svg";

function App() {
  // form state
  const [formData, setFormData] = useState({
    ownerName: "",
    numberString: "",
    month: "",
    year: "",
    cvc: "",
    submitted: false,
  });

  // errors
  const [errors, setErrors] = useState({
    ownerName: "",
    numberString: "",
    date: "",
    cvc: "",
    submitted: "",
  });

  // handle input onChange
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    let newErrors = {
      ownerName: "",
      numberString: "",
      date: "",
      cvc: "",
      submitted: "",
    };

    // validate name
    if (formData.ownerName === "") {
      newErrors.ownerName = "Can't be blank";
    } else {
      newErrors.ownerName = "";
    }

    // validate card number
    if (formData.numberString === "") {
      newErrors.numberString = "Can't be blank";
    } else if (!/^\d+$/.test(formData.numberString)) {
      newErrors.numberString = "Wrong format, numbers only";
    } else if (formData.numberString.length < 16) {
      newErrors.numberString = "Must be 16 digits long";
    } else {
      newErrors.numberString = "";
    }

    // validate expiration date
    if (formData.month === "" || formData.year === "") {
      newErrors.date = "Can't be blank";
    } else if (!/^\d+$/.test(formData.month) || !/^\d+$/.test(formData.year)) {
      newErrors.date = "Wrong format, numbers only";
    } else if (formData.month.length < 2) { 
      newErrors.date = "Month must be two digits long";
    } else if (formData.year.length < 2) { 
      newErrors.date = "Year must be two digits long";
    } else {
      newErrors.date = "";      
    }

    // validate CVC
    if (formData.cvc === "") {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d+$/.test(formData.cvc)) {
      newErrors.cvc = "Wrong format, numbers only";
    } else if (formData.cvc.length < 3) { 
      newErrors.cvc = "CVC must be three digits long";
    } else {
      newErrors.cvc = "";    
    }

    setErrors(newErrors);
    

    for (const value of Object.values(newErrors)) {
      if (value !== '') return console.log('Poopy');
    }

    // console.log('all gucci');

    setFormData((prevFormData) => ({ ...prevFormData, submitted: true }));
  }

  return (
    <>
      <div className="left">
        <div className="cards-container">
          <div className="card-1">
            <img className="card-logo" src={cardLogo} alt="" />
            <div className="card-number">
              <p className="card-number-item item-1">
                {formData.numberString.substring(0, 4).padEnd(4, "0")}
              </p>
              <p className="card-number-item item-2">
                {formData.numberString.substring(4, 8).padEnd(4, "0")}
              </p>
              <p className="card-number-item item-3">
                {formData.numberString.substring(8, 12).padEnd(4, "0")}
              </p>
              <p className="card-number-item item-4">
                {formData.numberString.substring(12, 16).padEnd(4, "0")}
              </p>
            </div>
            <div className="card-footer">
              <p className="card-owner">
                {formData.ownerName === ""
                  ? "Jane Appleseed"
                  : formData.ownerName}
              </p>
              <p className="card-expiration">
                {formData.month.padEnd(2, "0")}/{formData.year.padEnd(2, "0")}
              </p>
            </div>
          </div>
          <div className="card-2">
            <p className="card-cvc">{formData.cvc.padEnd(3, "0")}</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        {!formData.submitted ? (
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="owner">Cardholder Name</label>
            <input
              className={errors.ownerName && "input-error"}
              type="text"
              placeholder="e.g. Jane Appleseed"
              id="owner"
              onChange={handleChange}
              name="ownerName"
              value={formData.ownerName}
            />
            <p className={`error-prompt ${errors.ownerName && "visible"}`}>
              {errors.ownerName}
            </p>

            <label htmlFor="number">Card Number</label>
            <input
              className={errors.numberString && "input-error"}
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              id="number"
              onChange={handleChange}
              name="numberString"
              value={formData.numberString}
              maxLength={16}
            />
            <p className={`error-prompt ${errors.numberString && "visible"}`}>
              {errors.numberString}
            </p>

            <div className="form-end-line">
              <div className="form-end-line-item-1">
                <label htmlFor="">Exp Date (MM/YY)</label>
                <div className="form-expiration">
                  <input
                    className={errors.date && "input-error"}
                    type="text"
                    placeholder="MM"
                    id="month"
                    onChange={handleChange}
                    name="month"
                    value={formData.month}
                    maxLength={2}
                  />

                  <input
                    className={errors.date && "input-error"}
                    type="text"
                    placeholder="YY"
                    id="year"
                    onChange={handleChange}
                    name="year"
                    value={formData.year}
                    maxLength={2}
                  />
                </div>

                <p className={`error-prompt ${errors.date && "visible"}`}>
                  {errors.date}
                </p>
              </div>

              <div className="form-end-line-item-2">
                <label htmlFor="cvc">CVC</label>
                <input
                  className={errors.cvc && "input-error"}
                  type="text"
                  placeholder="e.g. 123"
                  id="cvc"
                  onChange={handleChange}
                  name="cvc"
                  value={formData.cvc}
                  maxLength={3}
                />
                <p className={`error-prompt ${errors.cvc && "visible"}`}>
                  {errors.cvc}
                </p>
              </div>
            </div>

            <button className="btn">Confirm</button>
          </form>
        ) : (
          <div className="complete">
            <img className="complete-icon" src={iconComplete} alt="" />
            <h2 className="complete-title">Thank you!</h2>
            <p className="complete-desc">We've added your card details.</p>
            <button className="complete-btn">Continue</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
