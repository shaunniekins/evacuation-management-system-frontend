import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const MunicipalityList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getMunicipality();
  }, []);

  const getMunicipality = async () => {
    let response = await fetch(`${BASE_URL}/api/municipality`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const MunicipalityAdd = async (name, province) => {
  try {
    const response = await fetch(`${BASE_URL}/api/municipality/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
        province: province,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const MunicipalityUpdate = async (id, name, province) => {
  try {
    const response = await fetch(`${BASE_URL}/api/municipality/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        province: province,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const MunicipalityDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/municipality/${id}`, {
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