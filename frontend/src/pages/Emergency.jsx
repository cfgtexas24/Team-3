import React, { useState } from "react";
import { AlertCircle, User, Phone, FileText, Mail } from "lucide-react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    issue: "",
  });
  const [loading, setLoading] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = async (data) => {
    // This is a mock function. In a real scenario, you'd call your backend API here.
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Sending email with data:", data);
        // Simulate email content
        const emailContent = `
          New Emergency Request:
          Name: ${data.firstName} ${data.lastName}
          Phone: ${data.phone}
          Issue: ${data.issue}
        `;
        console.log("Email content:", emailContent);
        resolve(true);
      }, 2000); // Simulate network delay
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendEmail(formData);
      setNotificationSent(true);
      setFormData({ firstName: "", lastName: "", phone: "", issue: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-600 p-6 text-white flex items-center space-x-2">
          <AlertCircle className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Emergency Form</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span>Issue</span>
            </label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <Mail className="w-5 h-5 mr-2" />
            )}
            {loading ? "Sending..." : "Submit Emergency Request"}
          </button>

          {notificationSent && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Email sent successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
