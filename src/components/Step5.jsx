// src/pages/Step5.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveStepData, getStepData } from '../utils/storage';

const Step5 = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    commencementDate: '2025-06-01',
    periodStanding: '0 Year 0 Month 9 Days',
    pan: 'AAAAA1111G',
    vat: '1111111111',
    cst: '1111111111',
    gst: '1111111111111',
    foreignEmployer: { name: '', address: '', salary: '' },
    multipleEmployers: true,
    additionalEmployers: [{ name: '', address: '', salary: '' }],
    engagedWith: 'Employment'
  });

  // Load from localStorage
  useEffect(() => {
    const savedData = getStepData('step5');
    if (savedData) setForm(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEngagedChange = (value) => {
    setForm({ ...form, engagedWith: value });
  };

  const handleEmployerChange = (index, field, value) => {
    const updated = [...form.additionalEmployers];
    updated[index][field] = value;
    setForm({ ...form, additionalEmployers: updated });
  };

  const addEmployer = () => {
    setForm({
      ...form,
      additionalEmployers: [...form.additionalEmployers, { name: '', address: '', salary: '' }]
    });
  };

  const handleSubmit = () => {
    saveStepData('step5', form); // Save to localStorage
    toast.success('✅ Step 5 data saved successfully!');
    setTimeout(() => navigate('/step6b'), 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <p className="text-blue-700 text-lg font-semibold">
        Step: <span className="text-green-600 font-bold">3(b) of 3</span>
      </p>

      <h3 className="text-lg font-semibold text-cyan-800 underline">Other Details</h3>

      <p className="mt-2 font-semibold text-gray-800">Engaged with*:</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {['Profession', 'Trade', 'Calling', 'Employment'].map(option => (
          <label
            key={option}
            className={`flex items-center gap-2 px-3 py-2 rounded shadow-sm cursor-pointer font-semibold border ${form.engagedWith === option ? 'bg-blue-200 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
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

      <h4 className="text-blue-700 font-semibold mt-6">Furnish the Details of Employment:</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="flex flex-col">
          <label className="font-bold mb-1">Date of Commencement*</label>
          <input type="date" name="commencementDate" value={form.commencementDate} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">Period of Standing*</label>
          <input name="periodStanding" value={form.periodStanding} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">PAN/TAN*</label>
          <input name="pan" value={form.pan} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {['vat', 'cst', 'gst'].map(key => (
          <div className="flex flex-col" key={key}>
            <label className="font-bold mb-1">✔ {key.toUpperCase()}</label>
            <input name={key} value={form[key]} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
        ))}
      </div>

      <h4 className="text-blue-700 mt-6">Diplomatic/Consular Employer:</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {['name','address','salary'].map(field => (
          <input
            key={field}
            placeholder={field === 'salary' ? 'Monthly Salary/Wages' : `Employer ${field.charAt(0).toUpperCase()+field.slice(1)}`}
            value={form.foreignEmployer[field]}
            onChange={e => setForm(prev => ({ ...prev, foreignEmployer: { ...prev.foreignEmployer, [field]: e.target.value }}))}
            className="border p-2 rounded w-full"
          />
        ))}
      </div>

      <p className="mt-4 text-blue-700 font-semibold">Simultaneously engaged with more than one employer?</p>
      <div className="flex gap-4 items-center mt-2">
        <label className="flex items-center gap-2">
          <input type="radio" checked={!form.multipleEmployers} onChange={() => setForm({ ...form, multipleEmployers: false })} /> No
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={form.multipleEmployers} onChange={() => setForm({ ...form, multipleEmployers: true })} /> Yes
        </label>
      </div>

      {form.multipleEmployers && (
        <div className="mt-4 space-y-4">
          {form.additionalEmployers.map((emp, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded">
              <input value={emp.name} onChange={(e) => handleEmployerChange(idx,'name',e.target.value)} placeholder="Name of Employer" className="border p-2 rounded" />
              <input value={emp.address} onChange={(e) => handleEmployerChange(idx,'address',e.target.value)} placeholder="Address of Employer" className="border p-2 rounded" />
              <input value={emp.salary} onChange={(e) => handleEmployerChange(idx,'salary',e.target.value)} placeholder="Monthly Salary/Wages" className="border p-2 rounded" />
            </div>
          ))}
          <button onClick={addEmployer} className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded border border-green-400">+ Add Employer</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <button onClick={() => navigate('/step4')} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">⬅ Back</button>
        <button onClick={handleSubmit} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">Submit ✅</button>
      </div>
    </div>
  );
};

export default Step5;
