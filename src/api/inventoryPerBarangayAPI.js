import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const BarangayInventoryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let response = await fetch(`${BASE_URL}/api/barangayinventory`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const BarangayInventoryAdd = async (item, unit, qty, barangay) => {
  try {
    const response = await fetch(`${BASE_URL}/api/barangayinventory/`, {
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
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const BarangayInventoryUpdate = async (
  id,
  item,
  unit,
  qty,
  barangay
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/barangayinventory/${id}`, {
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
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const BarangayInventoryDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/barangayinventory/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};