import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const StockinList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getStockin();
  }, []);

  const getStockin = async () => {
    let response = await fetch(`${BASE_URL}/api/stockin`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const StockinAdd = async (
  givenBy,
  donor,
  dateReceived,
  item,
  qty,
  expir_date
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/stockin/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        givenBy: givenBy,
        donor: donor,
        dateReceived: dateReceived,
        item: item,
        qty: qty,
        expir_date: expir_date
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const StockinUpdate = async (
  id,
  givenBy,
  donor,
  dateReceived,
  expir_date,
  item,
  qty
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/stockin/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        givenBy: givenBy,
        donor: donor,
        dateReceived: dateReceived,
        item: item,
        qty: qty,
        expir_date: expir_date
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const StockinDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/stockin/${id}`, {
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