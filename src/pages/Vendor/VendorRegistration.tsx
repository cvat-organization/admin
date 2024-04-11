import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./VendorRegistration.css";

const VendorForm: React.FC = () => {
  const totalStages = 3;
  const [currentStage, setCurrentStage] = useState(1);
  const [formDataStage1, setFormDataStage1] = useState({
    businessName: '',
    businessLogo: null,
    businessEmail: '',
    businessDomain: '',
    businessContactNo: '',
    businessDescription: '',
    subCategories: '',
    serviceType: '',
    address: ''
  });
  const [formDataStage2, setFormDataStage2] = useState({
    contactPersonName: '',
    contactPersonNo: '',
    contactPersonDesignation: '',
    isDecisionMaker: 'yes',
    businessCertificates: {
      incorporateCert: null as File | null,
      gstCert: null as File | null,
      panCert: null as File | null
    }
  });
  

  const handleSubmitStage1 = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle form submission for stage 1
    // For example, validation, API calls, etc.
    setCurrentStage(2);
  };

  const handleSubmitStage2 = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle form submission for stage 2
    // For example, validation, API calls, etc.
    // After successful submission, you can move to the third stage
    setCurrentStage(3);

    // Simulate going back to the first stage after 15 seconds
    setTimeout(() => {
      setCurrentStage(1);
    }, 15000);
  };

  const handleBackToPrevStage = () => {
    setCurrentStage(currentStage - 1);
  };


  const progress = (currentStage / totalStages) * 100;

  return (
    <div className='VendorFormContainer'>
        <h1>Vendor Registration</h1>
      {/* Progress bar */}
      <div className='ProgressContainer' style={{ width: '100%', backgroundColor: '#ddd' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '10px',
            backgroundColor: '#d19641',
            marginBottom:'15px'
          }}
        ></div>
      </div>

      {currentStage === 1 && (
                <form onSubmit={handleSubmitStage1}>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.businessName} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, businessName: e.target.value })} 
                            placeholder="" 
                            required 
                            id="businessNameInput"
                        />
                        <label htmlFor="businessNameInput" className="placeholder-label">Business Name</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="email" 
                            value={formDataStage1.businessEmail} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, businessEmail: e.target.value })} 
                            placeholder="" 
                            required 
                            id="businessEmailInput"
                        />
                        <label htmlFor="businessEmailInput" className="placeholder-label">Business Email</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.businessDomain} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, businessDomain: e.target.value })} 
                            placeholder="" 
                            required 
                            id="businessDomainInput"
                        />
                        <label htmlFor="businessDomainInput" className="placeholder-label">Business Domain</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.businessContactNo} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, businessContactNo: e.target.value })} 
                            placeholder="" 
                            required 
                            id="businessContactNoInput"
                        />
                        <label htmlFor="businessContactNoInput" className="placeholder-label">Business Contact No</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.businessDescription} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, businessDescription: e.target.value })} 
                            placeholder="" 
                            required 
                            id="businessDescriptionInput"
                        />
                        <label htmlFor="businessDescriptionInput" className="placeholder-label">Business Description</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.subCategories} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, subCategories: e.target.value })} 
                            placeholder="" 
                            required 
                            id="subCategoriesInput"
                        />
                        <label htmlFor="subCategoriesInput" className="placeholder-label">Sub Categories</label>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            value={formDataStage1.serviceType} 
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, serviceType: e.target.value })} 
                            placeholder="" 
                            required 
                            id="serviceTypeInput"
                        />
                        <label htmlFor="serviceTypeInput" className="placeholder-label">Service Type</label>
                    </div>

                    <div className="input-wrapper">
                        <textarea
                            value={formDataStage1.address}
                            onChange={(e) => setFormDataStage1({ ...formDataStage1, address: e.target.value })}
                            placeholder=""
                            rows={3} // Specify the number of visible text lines
                            required
                            id="addressInput"
                        />
                        <label htmlFor="addressInput" className="placeholder-label">Address</label>
                    </div>

                    <button type="submit">Next</button>
                </form>
                )}
    {currentStage === 2 && (
    <form onSubmit={handleSubmitStage2}>
        {/* Stage 2 form fields */}
        <div className="input-wrapper">
            <input 
                type="text" 
                value={formDataStage2.contactPersonName} 
                onChange={(e) => setFormDataStage2({ ...formDataStage2, contactPersonName: e.target.value })} 
                placeholder="" 
                required 
                id="contactPersonNameInput"
            />
            <label htmlFor="contactPersonNameInput" className="placeholder-label">Contact Person Name</label>
        </div>

        <div className="input-wrapper">
            <input 
                type="text" 
                value={formDataStage2.contactPersonNo} 
                onChange={(e) => setFormDataStage2({ ...formDataStage2, contactPersonNo: e.target.value })} 
                placeholder="" 
                required 
                id="contactPersonNoInput"
            />
            <label htmlFor="contactPersonNoInput" className="placeholder-label">Contact Person No</label>
        </div>

        <div className="input-wrapper">
            <input 
                type="text" 
                value={formDataStage2.contactPersonDesignation} 
                onChange={(e) => setFormDataStage2({ ...formDataStage2, contactPersonDesignation: e.target.value })} 
                placeholder="" 
                required 
                id="contactPersonDesignationInput"
            />
            <label htmlFor="contactPersonDesignationInput" className="placeholder-label">Contact Person Designation</label>
        </div>

        <div className="input-wrapper">
            <select
                value={formDataStage2.isDecisionMaker} 
                onChange={(e) => setFormDataStage2({ ...formDataStage2, isDecisionMaker: e.target.value })} 
                required 
            >
                <option value="" disabled>Decision Maker</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label className="placeholder-label">Decision Maker</label>
        </div>
        {/* Assuming you want to upload files for certificates */}
          {/* File Inputs */}
    <div>
      <label htmlFor="incorporateCert">Incorporate Certificate:</label>
      <input 
        type="file" 
        id="incorporateCert"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            setFormDataStage2({ 
              ...formDataStage2, 
              businessCertificates: { 
                ...formDataStage2.businessCertificates, 
                incorporateCert: file 
              } 
            });
          }    
        }} 
        required 
      />
    </div>

    <div>
      <label htmlFor="gstCert">GST Certificate:</label>
      <input 
        type="file" 
        id="gstCert"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            setFormDataStage2({ 
              ...formDataStage2, 
              businessCertificates: { 
                ...formDataStage2.businessCertificates, 
                gstCert: file 
              } 
            });
          }
        }} 
        required 
      />
    </div>

    <div>
      <label htmlFor="panCert">PAN Certificate:</label>
      <input 
        type="file" 
        id="panCert"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            setFormDataStage2({ 
              ...formDataStage2, 
              businessCertificates: { 
                ...formDataStage2.businessCertificates, 
                panCert: file 
              } 
            });
          }
        }} 
        required 
      />
    </div>

    <button type="submit">Submit</button>
    <button type="button" onClick={handleBackToPrevStage}>Back</button>
  </form>
)}{currentStage === 3 && (
    <div>
      {/* Stage 3 content */}
      <div className="registered-container">
        <div className="tick-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <p>The vendor is registered!</p>
      </div>
    </div>
  )}  
    </div>
  );
};

export default VendorForm;
