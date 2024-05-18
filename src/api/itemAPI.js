import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const ItemList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let response = await fetch(`${BASE_URL}/api/items`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const ItemAdd = async (name, unit) => {
  try {
    const response = await fetch(`${BASE_URL}/api/items/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
        unit: unit,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const ItemUpdate = async (id, name, unit) => {
  try {
    const response = await fetch(`${BASE_URL}/api/items/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        unit: unit,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const ItemDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/items/${id}`, {
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