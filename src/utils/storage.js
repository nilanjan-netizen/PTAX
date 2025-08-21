// src/utils/storage.js

// ✅ Save single step data
export const saveStepData = (stepId, data) => {
  localStorage.setItem(stepId, JSON.stringify(data));
};

// ✅ Get single step data
export const getStepData = (stepId) => {
  const raw = localStorage.getItem(stepId);
  return raw ? JSON.parse(raw) : null;
};

// ✅ Save final record (step1–6 merged into one)
export const saveFinalRecord = () => {
  const record = {};

  // only steps 1 to 6
  for (let i = 1; i <= 6; i++) {
    const stepData = getStepData(`step${i}`);
    if (stepData) record[`step${i}`] = stepData;
  }

  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.push(record);

  // max 5 people (records)
  if (records.length > 5) {
    records.shift(); // remove oldest
  }

  localStorage.setItem("records", JSON.stringify(records));

  // Optional: clear step data after final save
  for (let i = 1; i <= 6; i++) {
    localStorage.removeItem(`step${i}`);
  }
};

// ✅ Get all saved records
export const getAllRecords = () => {
  return JSON.parse(localStorage.getItem("records")) || [];
};

// ✅ Clear records
export const clearRecords = () => {
  localStorage.removeItem("records");
};
