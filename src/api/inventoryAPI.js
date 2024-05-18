import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const InventoryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let response = await fetch(`${BASE_URL}/api/inventory`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const InventoryAdd = async (item, qty) => {
  try {
    const response = await fetch(`${BASE_URL}/api/inventory/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        item: item,
        qty: qty,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const InventoryUpdate = async (id, item, qty) => {
  try {
    const response = await fetch(`${BASE_URL}/api/inventory/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        qty: qty,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const InventoryDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/inventory/${id}`, {
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