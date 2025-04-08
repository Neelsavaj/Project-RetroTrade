import React from "react";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Payment submitted successfully!");
        reset(); // Reset form after successful submission
      } else {
        alert("Error submitting payment.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Payment</h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Buyer ID */}
          <div className="mb-3">
            <label className="form-label">Buyer ID:</label>
            <input
              type="text"
              className="form-control"
              {...register("buyerId", { required: "Buyer ID is required" })}
            />
            <p className="text-danger">{errors.buyerId?.message}</p>
          </div>

          {/* Payment Date */}
          <div className="mb-3">
            <label className="form-label">Payment Date:</label>
            <input
              type="date"
              className="form-control"
              {...register("payment_date", { required: "Payment date is required" })}
            />
            <p className="text-danger">{errors.payment_date?.message}</p>
          </div>

          {/* Payment Status */}
          <div className="mb-3">
            <label className="form-label">Payment Status:</label>
            <input
              type="text"
              className="form-control"
              {...register("payment_status", { required: "Payment status is required" })}
            />
            <p className="text-danger">{errors.payment_status?.message}</p>
          </div>

          {/* Payment Method */}
          <div className="mb-3">
            <label className="form-label">Payment Method:</label>
            <select className="form-select" {...register("payment_method")} defaultValue="Credit Card">
              <option value="Credit Card">Credit Card</option>
              <option value="G-pay">G-pay</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
