import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const BarangayList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getBarangay();
  }, []);

  const getBarangay = async () => {
    let response = await fetch(`${BASE_URL}/api/barangay`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const BarangayAdd = async (name, municipality) => {
  try {
    const response = await fetch(`${BASE_URL}/api/barangay/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
        municipality: municipality,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const BarangayUpdate = async (id, name, municipality) => {
  try {
    const response = await fetch(`${BASE_URL}/api/barangay/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        municipality: municipality,
      }),
    });
    const data = await response.json();
    // alert("Updated!");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const BarangayDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/barangay/${id}`, {
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
