import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const CalamityList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getCalamity();
  }, []);

  const getCalamity = async () => {
    let response = await fetch(`${BASE_URL}/api/calamity`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const CalamityAdd = async (name, date) => {
  try {
    const response = await fetch(`${BASE_URL}/api/calamity/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
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

export const CalamityUpdate = async (id, name, date) => {
  try {
    const response = await fetch(`${BASE_URL}/api/calamity/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
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

export const CalamityDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/calamity/${id}`, {
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
