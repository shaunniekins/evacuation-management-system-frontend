import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const DistributeBarangayInventoryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let response = await fetch(`${BASE_URL}/api/distributionbarangay`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const DistributeBarangayInventoryAdd = async (
  item,
  unit,
  qty,
  barangay,
  date
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/distributionbarangay/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        unit: unit,
        qty: qty,
        barangay: barangay,
        date: date,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const DistributeBarangayInventoryUpdate = async (
  id,
  item,
  unit,
  qty,
  barangay,
  date
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/distributionbarangay/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        unit: unit,
        qty: qty,
        barangay: barangay,
        date: date,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const DistributeBarangayInventoryDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/distributionbarangay/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};