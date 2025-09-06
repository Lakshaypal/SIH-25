import React, { useState } from 'react';
import GeoCamera from '../components/kyc/GeoCamera';

const KycPage = () => {
    // In a real app, use a state management library like Zustand or Redux
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        ngoName: '',
        ngoUid: '',
        email: '',
        phone: '',
        address: '',
        walletAddress: '', // This should be pre-filled from the connected wallet
        gst: null,
        aadhaar: null,
        pan: null,
        ekycVideo: null,
        geoTaggedPhoto: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleGeoCapture = (capture) => {
        setFormData({ ...formData, geoTaggedPhoto: capture });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement submission logic
        // 1. Create a FormData object to send multipart data (files)
        // 2. Upload files (GST, Aadhaar, PAN, video, photo) to a secure storage (S3/IPFS) via your backend.
        // 3. Your backend returns the URLs/CIDs of the stored files.
        // 4. Save the form data along with file URLs to your database.
        console.log("Submitting KYC Data:", formData);
        alert("KYC Submitted for review! (Check console for data)");
    };

    // Simple helper for input fields to reduce repetition
    const InputField = ({ name, label, type = 'text', required = true }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-light-slate">{label}</label>
            <input 
                type={type} 
                name={name} 
                id={name}
                required={required}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-light-navy border border-lightest-navy rounded-md text-lightest-slate focus:outline-none focus:ring-green focus:border-green" 
            />
        </div>
    );
    
    const FileField = ({ name, label, accept }) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-light-slate">{label}</label>
            <input 
                type="file"
                name={name}
                id={name}
                required
                accept={accept}
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-slate file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green file:text-navy hover:file:bg-opacity-90"
            />
        </div>
    );


  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-lightest-slate mb-2">Onboarding & KYC</h1>
        <p className="text-slate mb-8">Complete your profile to get verified as a project originator.</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal & NGO Details */}
            <div className="p-6 bg-light-navy rounded-lg">
                <h2 className="text-2xl font-semibold text-green mb-6">Organization & Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="ngoName" label="NGO / Organization Name" />
                    <InputField name="ngoUid" label="NGO Unique ID (e.g., DARPAN ID)" />
                    <InputField name="name" label="Contact Person First Name" />
                    <InputField name="surname" label="Contact Person Last Name" />
                    <InputField name="email" label="Email Address" type="email" />
                    <InputField name="phone" label="Phone Number" type="tel" />
                    <InputField name="address" label="Full Address" />
                    <InputField name="walletAddress" label="Wallet Address (auto-filled)" />
                </div>
            </div>

             {/* Section 2: Document Upload */}
            <div className="p-6 bg-light-navy rounded-lg">
                <h2 className="text-2xl font-semibold text-green mb-6">Verification Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileField name="gst" label="GST Certificate (PDF)" accept=".pdf" />
                    <FileField name="aadhaar" label="Aadhaar Card (PDF)" accept=".pdf,.jpg,.png" />
                    <FileField name="pan" label="PAN Card (PDF)" accept=".pdf,.jpg,.png" />
                    <FileField name="ekycVideo" label="e-KYC Video (MP4, max 30s)" accept="video/mp4" />
                </div>
            </div>

            {/* Section 3: Geo-tagged Field Proof */}
            <div className="p-6 bg-light-navy rounded-lg">
                <h2 className="text-2xl font-semibold text-green mb-6">Field Verification Photo</h2>
                <p className="text-slate mb-4">Use the camera below to take a live, geo-tagged photo of your project site. This is a crucial step for verification.</p>
                <GeoCamera onCapture={handleGeoCapture} />
            </div>

            <div className="pt-5">
                <button type="submit" className="w-full bg-green text-navy font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-101">
                    Submit for Verification
                </button>
            </div>
        </form>
    </div>
  );
};

export default KycPage;