import { useState, useEffect } from "react";

export const RepackedList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getRepacked();
  }, []);

  const getRepacked = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/repacked");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const RepackedAdd = async (
  items,
  units,
  qty,
  instance,
  reason,
  barangay
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/repacked/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        units: units,
        qty: qty,
        instance: instance,
        reason: reason,
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

export const RepackedUpdate = async (
  id,
  items,
  units,
  qty,
  instance,
  reason,
  barangay
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/repacked/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        units: units,
        qty: qty,
        instance: instance,
        reason: reason,
        barangay: barangay,
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

export const RepackedDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/repacked/" + id, {
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
