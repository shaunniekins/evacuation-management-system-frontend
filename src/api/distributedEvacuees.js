import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const evacDistributeList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let response = await fetch(`${BASE_URL}/api/distributed`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const evacDistributeAdd = async (
  repackedItem,
  calamity,
  calamityDate,
  dateDistributed,
  evacuee,
  headFamily,
  is_distributed
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/distributed/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repackedItem: repackedItem,
        calamity: calamity,
        calamityDate: calamityDate,
        dateDistributed: dateDistributed,
        evacuee: evacuee,
        headFamily: headFamily,
        is_distributed: is_distributed,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const evacDistributeUpdate = async (
  id,
  repackedItem,
  calamity,
  calamityDate,
  dateDistributed,
  evacuee,
  headFamily,
  is_distributed
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/distributed/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repackedItem: repackedItem,
        calamity: calamity,
        calamityDate: calamityDate,
        dateDistributed: dateDistributed,
        evacuee: evacuee,
        headFamily: headFamily,
        is_distributed: is_distributed,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const evacDistributeDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/distributed/${id}`, {
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