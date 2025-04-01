import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../employeecomponentsstyles/Employeedashboard.css";
import personsittingwithlaptop from '../images/personsittingwithlaptop.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSun } from "@fortawesome/free-solid-svg-icons";
import employeeimage from '../images/employeeimage-removebg-preview.png'

const Employeedashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]); // Missing field declared here
  const [latestNotice, setLatestNotice] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const storedEmployee = JSON.parse(localStorage.getItem("employeeData"));
    if (!storedEmployee) {
      navigate("/adminlogin");
    } else {
      setEmployeeData(storedEmployee);
      fetchLeaveRequests(storedEmployee.employeeId); // Fetch leave requests for the stored employee
    }
  }, []); // ✅ Removed `navigate` from dependency array

  // Fetch Latest Notice
  useEffect(() => {
    fetch("http://localhost:9000/notice/latest")
      .then((response) => response.json())
      .then((data) => setLatestNotice(data))
      .catch((error) => console.error("Error fetching notice:", error));
  }, []);

  // Fetch Leave Requests
  const fetchLeaveRequests = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:9000/leaves/employee/${employeeId}`);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
      const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setCurrentDateTime(`${formattedDate} ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="employeedashboard-container">
      <div className="navbar-dashboard-container">
        <div><h3>Employee Dashboard</h3></div>
        <div className="date-time-container">
          <p>{currentDateTime}</p>
          <FontAwesomeIcon icon={faSun} className="faicon-container" />
          <FontAwesomeIcon icon={faHome} className="faicon-container" />
        </div>
      </div>
    
      <div className="employee-dashboard-second-div-container">
        <div className="navbar-employee-dashboard-container">
          <div className="navbar-employee-heading-container">
            <h3>Hi, {employeeData?.employeeName || "N/A"}</h3>
            <strong><h2>Welcome to your login</h2></strong>
            <h3>Have a good day</h3>
          </div>
          <div className="navbar-employee-image-container">
            <img src={personsittingwithlaptop} alt="Person Image" />
          </div>
        </div>
      </div>

      <div className="employee-details-page-container">
        <div className="employee-details-image-container"><img src={employeeimage} alt="" /></div>
        <div className="employeedetails-dashboard-conatiner">
          {/* Employee Details Section */}
          <div className="employee-details-container">
            <h2>Employee Information</h2>
            <p>
              <strong>Employee Name:</strong> {employeeData?.employeeName || "N/A"}
            </p>
            <p>
              <strong>Employee ID:</strong> {employeeData?.employeeId || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {employeeData?.department || "N/A"}
            </p>
            <p>
              <strong>Designation:</strong> {employeeData?.designation || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="employee-dashboard-third-div-container">
        {/* Latest Notice */}
        <div className="employee-second-page-container">
          {latestNotice ? (
            <div className="employee-dashboard-notice-box">
              <h3>{latestNotice.noticeTitle}</h3>
              <p><strong>Department:</strong> {latestNotice.department}</p>
              <p><strong>Date:</strong> {new Date(latestNotice.noticeDate).toLocaleDateString()}</p>
              <p><strong>Details:</strong> {latestNotice.noticeDetails}</p>
              <small><strong>Created At:</strong> {new Date(latestNotice.createdAt).toLocaleString()}</small>
            </div>
          ) : (
            <p>No latest notices available.</p>
          )}
        </div>
        
        <div className="employee-dashboard-leave-container">
          {/* List of Leave Requests */}
          <h2 className="employee-dashboard-leaveRequest-listTitle">My Leave Requests</h2>
          {leaveRequests.length > 0 ? (
            <table className="dashboard-leaveRequest-table">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="leaveRequest-noRequests">No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employeedashboard;