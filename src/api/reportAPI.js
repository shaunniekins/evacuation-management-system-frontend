import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const EvacueeReport = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let response = await fetch(`${BASE_URL}/api/resident/`);
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
    let response = await fetch(`${BASE_URL}/api/barangay/`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};