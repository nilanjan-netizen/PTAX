import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveStepData, getStepData } from '../utils/storage';

const Step3 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    establishmentName: '',
    jurisdiction: 'Agartala',
    charge: 'Charge - I',
    district: 'West Tripura',
    pinCode: '799001',
    address: '',
    additionalName: '',
    additionalAddress: '',
    category: 'Legal Profession',
    subCategory: 'Practitioners'
  });

  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    const savedData = getStepData('step3');
    if (savedData) {
      setForm(savedData.form || form);
      setExtraFields(savedData.extraFields || []);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addExtraField = () => {
    if (extraFields.length < 5) {
      setExtraFields([...extraFields, { id: Date.now(), type: '', value: '' }]);
    } else {
      toast.warning('⚠️ Maximum 5 extra fields allowed!');
    }
  };

  const handleExtraFieldChange = (id, field, value) => {
    setExtraFields(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleBack = () => navigate('/step2');

  const handleNext = () => {
    saveStepData('step3', { form, extraFields });
    toast.success('✅ Step 3 data saved successfully!');
    setTimeout(() => navigate('/step4'), 1000);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <p className="text-blue-700 text-lg font-semibold">
        Step: <span className="text-green-600 font-bold">3 of 3</span>
      </p>

      <h2 className="text-xl font-semibold text-cyan-800 border-b pb-2">Establishment Information</h2>
      <p className="text-sm text-red-600">
        [Note: Furnish details of the establishment from which you have maximum earning.]
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Name of Establishment*</label>
          <input name="establishmentName" onChange={handleChange} value={form.establishmentName} className="border p-2 rounded w-full" />
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Area of Jurisdiction*</label>
          <select name="jurisdiction" onChange={handleChange} value={form.jurisdiction} className="border p-2 rounded w-full">
            <option>Agartala</option>
            <option>Udaipur</option>
            <option>Kailashahar</option>
            <option>Dharmanagar</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Charge*</label>
          <select name="charge" onChange={handleChange} value={form.charge} className="border p-2 rounded w-full">
            <option>Charge - I</option>
            <option>Charge - II</option>
            <option>Charge - III</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">District*</label>
          <select name="district" onChange={handleChange} value={form.district} className="border p-2 rounded w-full">
            <option>West Tripura</option>
            <option>Sepahijala</option>
            <option>Khowai</option>
            <option>Gomati</option>
            <option>Dhalai</option>
            <option>Unakoti</option>
            <option>North Tripura</option>
            <option>South Tripura</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline text-red-700 mb-1">PIN Code*</label>
          <input name="pinCode" onChange={handleChange} value={form.pinCode} className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-bold underline mb-1">Establishment Address*</label>
          <input name="address" onChange={handleChange} value={form.address} className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2 text-sm text-blue-700">Additional Place of Work (optional)</div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Additional Name</label>
          <input name="additionalName" onChange={handleChange} value={form.additionalName} className="border p-2 rounded w-full" />
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Additional Address</label>
          <input name="additionalAddress" onChange={handleChange} value={form.additionalAddress} className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2">
          <button onClick={addExtraField} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full md:w-auto">+ Add More (Max 5)</button>
        </div>

        {extraFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <div className="flex flex-col">
              <label className="font-bold underline mb-1">Additional Detail Type #{index + 1}</label>
              <select
                value={field.type}
                onChange={(e) => handleExtraFieldChange(field.id, 'type', e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Type</option>
                <option value="Income Source">Income Source</option>
                <option value="Monthly Revenue">Monthly Revenue</option>
                <option value="Client Type">Client Type</option>
                <option value="Number of Employees">Number of Employees</option>
                <option value="GST Registered">GST Registered</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold underline mb-1">Detail</label>
              <input
                value={field.value}
                onChange={(e) => handleExtraFieldChange(field.id, 'value', e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </React.Fragment>
        ))}

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Category*</label>
          <select name="category" onChange={handleChange} value={form.category} className="border p-2 rounded w-full">
            <option>Legal Profession</option>
            <option>Medical Profession</option>
            <option>Engineering</option>
            <option>Architecture</option>
            <option>Education</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-bold underline mb-1">Sub-Category*</label>
          <select name="subCategory" onChange={handleChange} value={form.subCategory} className="border p-2 rounded w-full">
            <option>Practitioners</option>
            <option>Consultants</option>
            <option>Freelancers</option>
            <option>Trainers</option>
            <option>Assistants</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <button onClick={handleBack} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">⬅ Back</button>
        <button onClick={handleNext} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 w-full md:w-auto">Next ➡</button>
      </div>
    </div>
  );
};

export default Step3;
