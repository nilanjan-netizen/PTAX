import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveStepData, getStepData } from '../utils/storage';

const Step2 = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [applyingAs, setApplyingAs] = useState('');
  const [formData, setFormData] = useState({
    establishmentName: '',
    panTan: '',
    mobile: '',
    email: '',
  });

  // Load saved data & generate captcha
  useEffect(() => {
    generateCaptcha();
    const savedData = getStepData('step2');
    if (savedData) {
      setFormData(savedData);
      setApplyingAs(savedData.applyingAs || '');
    }
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 50) + 10;
    setCaptcha(`${a} + ${b}`);
  };

  const validateCaptcha = () => {
    const [a, b] = captcha.split('+').map((val) => parseInt(val.trim()));
    return a + b === parseInt(userCaptcha);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCaptcha()) {
      toast.error('❌ Wrong captcha!');
      generateCaptcha();
      setUserCaptcha('');
      return;
    }

    if (!applyingAs || applyingAs === 'Individual') {
      toast.error('❌ Please select "Others" to proceed!');
      return;
    }

    // Save Step2 data to localStorage
    saveStepData('step2', { ...formData, applyingAs });
    toast.success('✅ Step 2 data saved successfully!');

    setTimeout(() => navigate('/step2b'), 1000);
  };

  const handleBack = () => navigate('/');

  return (
    <div className="min-h-screen w-full bg-white font-sans">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-sky-700 text-white px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full"> <div className="flex flex-col"> <h1 className="text-4xl font-bold tracking-wide"> The Revenue Department, Government of Tripura </h1> <h2 className="text-2xl font-light">New Secretariat Building,</h2> <h3 className="text-xl font-extralight"> Agartala, Tripura-799010</h3> </div> <div className="h-full flex items-stretch"> <img src="data:image/png;base64,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" alt="Gov Logo" className="h-full w-auto object-contain border border-white rounded-md" /> </div> </div>
     


      <div className="px-10 py-8 w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Step: <span className="text-green-600">2</span> of 3
        </h2>

        {/* Applicant Type */}
        <div className="mb-6">
          <label className="block font-medium mb-1 text-lg">Applying as:</label>
          <div className="flex items-center gap-6">
            <label className="text-red-600 font-semibold cursor-pointer text-lg">
              <input
                type="radio"
                name="applyingAs"
                value="Individual"
                checked={applyingAs === 'Individual'}
                onChange={(e) => setApplyingAs(e.target.value)}
              />{' '}
              Individual
            </label>
            <label className="text-gray-700 font-semibold cursor-pointer text-lg">
              <input
                type="radio"
                name="applyingAs"
                value="Others"
                checked={applyingAs === 'Others'}
                onChange={(e) => setApplyingAs(e.target.value)}
              />{' '}
              Others
            </label>
          </div>
        </div>

        {applyingAs === 'Individual' && (
          <div className="text-red-600 font-semibold mb-4 text-lg">
            Not eligible. Please select <span className="underline">Others</span> only.
          </div>
        )}

        {applyingAs === 'Others' && (
          <form onSubmit={handleSubmit} className="bg-gray-100 p-10 rounded shadow-xl w-full">
            <h3 className="text-2xl font-semibold mb-6 text-blue-800">Business Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-medium mb-1 text-lg">
                  Name of the Establishment<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="establishmentName"
                  value={formData.establishmentName}
                  placeholder="Applicant's Name"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-lg">
                  PAN or TAN<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="panTan"
                  value={formData.panTan}
                  placeholder="PAN"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-lg">
                  Mobile Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-lg">
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
            </div>

            {/* Captcha */}
            <div className="mt-10">
              <label className="block font-medium mb-1 text-lg">
                Prove that you are not a robot<span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="bg-white border px-6 py-3 font-bold text-xl shadow-inner min-w-[130px] text-center">{captcha}</div>
                <input
                  type="number"
                  placeholder="Expression Result"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  className="border px-4 py-2 rounded max-w-xs w-full"
                  required
                />
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded shadow"
              >
                ⬅️ Back
              </button>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded shadow"
              >
                ✅ Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Step2;
