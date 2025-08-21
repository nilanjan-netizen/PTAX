// src/pages/Step4.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveStepData, getStepData } from '../utils/storage';

const Step4 = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    commencementDate: '2025-06-01',
    periodStanding: '0 Year 0 Month 9 Days',
    pan: 'AAAAA1111G',
    annualBusiness: '10000',
    avgWorkers: '10000',
    avgEmployees: '100',
    vat: '11111',
    cst: '11111',
    gst: '11111',
    engagedWith: 'Profession',
    vehicles: {
      taxis: 1,
      threeWheelers: 1,
      lightMotor: 1,
      goodVehicles: 1,
      trucks: 1,
      buses: 1
    },
    society: {
      state: true,
      district: true
    }
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = getStepData('step4');
    if (savedData) setForm(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVehicleChange = (type, value) => {
    setForm(prev => ({
      ...prev,
      vehicles: { ...prev.vehicles, [type]: value }
    }));
  };

  const handleEngagedChange = (value) => {
    setForm(prev => ({ ...prev, engagedWith: value }));
  };

  const handleSocietyChange = (level) => {
    setForm(prev => ({
      ...prev,
      society: { ...prev.society, [level]: !prev.society[level] }
    }));
  };

  const handleSubmit = () => {
    saveStepData('step4', form); // Save to localStorage
    toast.success('✅ Step 4 data saved successfully!');
    setTimeout(() => navigate('/step5'), 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <p className="text-blue-700 text-lg font-semibold">
        Step: <span className="text-green-600 font-bold">4 of 4</span>
      </p>

      <h3 className="text-lg font-semibold text-cyan-800 underline">Other Details</h3>

      <p className="mt-2 font-semibold text-gray-800">Engaged with*:</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {['Profession', 'Trade', 'Calling', 'Employment'].map(option => (
          <label
            key={option}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded shadow-sm cursor-pointer hover:bg-blue-100 font-semibold text-gray-800 border border-gray-300"
          >
            <input
              type="radio"
              name="engagedWith"
              value={option}
              checked={form.engagedWith === option}
              onChange={() => handleEngagedChange(option)}
              className="w-4 h-4"
            />
            {option}
          </label>
        ))}
      </div>

      <p className="font-semibold mt-4">Furnish the Details of Profession:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Date of Commencement*</label>
          <input type="date" name="commencementDate" value={form.commencementDate} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Period of Standing*</label>
          <input name="periodStanding" value={form.periodStanding} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">PAN/TAN*</label>
          <input name="pan" value={form.pan} onChange={handleChange} className="border p-2 rounded w-full" />
          <p className="text-sm text-gray-600">Permanent Income Tax Account Number</p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Annual Gross Business*</label>
          <input name="annualBusiness" value={form.annualBusiness} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Monthly Average Number of Workers</label>
          <input name="avgWorkers" value={form.avgWorkers} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Monthly Average Number of Employees</label>
          <input name="avgEmployees" value={form.avgEmployees} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
      </div>

      {/* Tax Registration */}
      <div className="mt-4">
        <p className="text-blue-700 font-semibold">Registered Taxpayer:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {['vat', 'cst', 'gst'].map(key => (
            <div className="flex flex-col" key={key}>
              <label className="font-bold mb-1">✔ {key.toUpperCase()}</label>
              <input name={key} value={form[key]} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Vehicles */}
      <div className="mt-4">
        <p className="text-blue-700 font-semibold">Held Vehicles under Motor Vehicles Act-1939:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {Object.keys(form.vehicles).map(key => (
            <div key={key} className="flex flex-col">
              <label className="font-bold mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              <input type="number" value={form.vehicles[key]} onChange={(e) => handleVehicleChange(key, e.target.value)} className="border p-2 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Society */}
      <div className="mt-4">
        <p className="text-blue-700 font-semibold">Engaged with Co-operative Society:</p>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.society.state} onChange={() => handleSocietyChange('state')} />
            State Level Society
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.society.district} onChange={() => handleSocietyChange('district')} />
            District Level Society
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <button onClick={() => navigate('/step3')} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">⬅ Back</button>
        <button onClick={handleSubmit} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">Submit ✅</button>
      </div>
    </div>
  );
};

export default Step4;
