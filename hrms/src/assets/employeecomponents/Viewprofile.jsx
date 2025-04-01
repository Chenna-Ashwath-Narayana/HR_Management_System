import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../employeecomponentsstyles/Viewprofile.css'; // Import regular CSS file
import employeeviewprofile from '../images/employeeprofile.png'
// import { FaFontAwesome, faUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCalendar, faCity, faClipboardUser, faContactBook, faDroplet , faEnvelope, faMap, faNotesMedical, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaAddressBook } from 'react-icons/fa';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const employeeData = JSON.parse(localStorage.getItem('employeeData'));

  useEffect(() => {
    if (!employeeData) {
      // Redirect to login if there is no employee data
      navigate('/adminlogin');
    }
  }, [employeeData, navigate]);

  return (
    <>
      <div className='viewprofile-dashboard-container'>
        <div className='viewprofile-image-container'><img src={employeeviewprofile} alt="employee profile Image" /></div>
        <div>

          <div>

            <div className='personal-details-container'>
            <h2>Personal Info</h2>
              <div className='personal-details-container1'>
                <div>
                  <label htmlFor="name"><FontAwesomeIcon icon={faClipboardUser} /> Name</label>
                  <p>{employeeData.employeeName}</p>
                </div>
                <div>
                  <label htmlFor="name"> <FontAwesomeIcon icon={faCalendar} /> Date of Birth</label>
                  <p>{employeeData.birthdate}</p>
                </div>
                <div>
                  <label htmlFor="name">  Gender</label>
                  <p>{employeeData.gender}</p>
                </div>
              </div>
              <div className='personal-details-container2'>
                <div>
                  <label htmlFor="name"> <FontAwesomeIcon icon={faDroplet} color='red'/> Blood Group </label>
                  <p>{employeeData.bloodgroup}</p>
                </div>
                <div>
                  <label htmlFor="name"> <FontAwesomeIcon icon={faUser} /> Martial Staus</label>
                  <p>{employeeData.martialstatus}</p>
                </div>
              </div>
            </div>

          </div>

          <div className='employee-contact-container'>
            <h2>Contact Information</h2>
            <div className='employee-contact-container1'>
              <div>
                <label htmlFor="Offical"> <FontAwesomeIcon icon={faEnvelope} /> Offical Email ID</label>
                <p>{employeeData.email}</p>
              </div>
              <div>
                <label htmlFor="personal"> <FontAwesomeIcon icon={faEnvelope} /> Personal Email ID</label>
                <p>{employeeData.email}</p>
              </div>
            </div>
            <div className='employee-contact-container2'>
              <div>
                <label htmlFor="mobile"> <FontAwesomeIcon icon={faContactBook}/> Phone Number</label>
                <p>{employeeData.mobile}</p>
              </div>
              <div>
                <label htmlFor="mobile"> <FontAwesomeIcon icon={faContactBook}/> Alternate Phone Number</label>
                <p>{employeeData.mobile}</p>
              </div>
            </div>
          </div>

          <div className='employee-address-container'>
            <h2>Address Information</h2>
            <div className='employee-address-container1'>
              <div>
                <label htmlFor="address1"> <FontAwesomeIcon icon={faAddressBook} /> Address1</label>
                <p>{employeeData.address1}</p>
              </div>
              <div>
                <label htmlFor="address2"> <FontAwesomeIcon icon={faAddressBook} /> Address2</label>
                <p>{employeeData.address2}</p>
              </div>
              <div>
                <label htmlFor="city"> <FontAwesomeIcon icon={faCity} /> City</label>
                <p>{employeeData.city}</p>
              </div>
            </div>
            <div className='employee-address-container2'>
              <div>
                <label htmlFor="state"> <FontAwesomeIcon icon={faMap} /> State</label>
                <p>{employeeData.state}</p>
              </div>
              <div>
                <label htmlFor="pincode"> <FontAwesomeIcon icon={faMap} /> Pincode</label>
                <p>{employeeData.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;