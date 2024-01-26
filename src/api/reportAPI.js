import { useState, useEffect } from "react";

export const EvacueeReport = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/resident/");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const BarangayReportItem = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/barangay/");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};
