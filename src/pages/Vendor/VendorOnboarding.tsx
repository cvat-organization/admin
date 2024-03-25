import React, { useState } from 'react';
import './VendorOnboarding.css';

const VendorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessLogo: null,
    address: '',
    businessDomain: '',
    subCategories: '',
    contactPersonName: '',
    businessContactNo: '',
    businessEmail: '',
    contactPersonNo: '',
    contactPersonDesignation: '',
    isDecisionMaker: 'yes',
    businessDescription: '',
    serviceType: '',
    businessCertificates: {
      incorporateCert: null,
      gstCert: null,
      panCert: null
    },
    fbId: '',
    instaId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileButtonClick = () => {
    document.getElementById('fileInput')?.click();
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length) {
      const file = files[0];
      setFormData(prevState => ({
        ...prevState,
        [name]: file
      }));
    }
  };
  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDecisionMakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      isDecisionMaker: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="vendor-form-container">
      <h1>Vendor Details Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Business Name:
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        Business Logo:
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleCheckboxChange}
          style={{ display: 'none' }}
        />
        {/* Custom button to trigger file input */}
        <button type="button" onClick={handleFileButtonClick}>
          Choose File
        </button>
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Domain:
          <input
            type="text"
            name="businessDomain"
            value={formData.businessDomain}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sub-categories:
          <input
            type="text"
            name="subCategories"
            value={formData.subCategories}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Person Name:
          <input
            type="text"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Contact No.:
          <input
            type="tel"
            name="businessContactNo"
            value={formData.businessContactNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Email:
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Person No.:
          <input
            type="tel"
            name="contactPersonNo"
            value={formData.contactPersonNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Person Designation:
          <input
            type="text"
            name="contactPersonDesignation"
            value={formData.contactPersonDesignation}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Is Decision Maker:
          <select name="isDecisionMaker" value={formData.isDecisionMaker} onChange={handleDecisionMakerChange} required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          Business Description:
          <textarea
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Service Type:
          <select name="serviceType" value={formData.serviceType} onChange={handleSelectChange} required>
            <option value="">Select Service Type</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label>
          Incorporate Certificate:
          <input
            type="file"
            name="incorporateCert"
            onChange={handleFileButtonClick}
            required
          />
        </label>
        <label>
          GST Certificate:
          <input
            type="file"
            name="gstCert"
            onChange={handleFileButtonClick}
            required
          />
        </label>
        <label>
          PAN Certificate:
          <input
            type="file"
            name="panCert"
            onChange={handleFileButtonClick}
            required
          />
        </label>
        <label>
          FB ID:
          <input
            type="text"
            name="fbId"
            value={formData.fbId}
            onChange={handleChange}
          />
        </label>
        <label>
          Instagram ID:
          <input
            type="text"
            name="instaId"
            value={formData.instaId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VendorForm;

