import { useState, useEffect } from "react";

export const resEvacList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getResEvac();
  }, []);

  const getResEvac = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/resident_evacuation");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const resEvacAdd = async (resident, evacuation, isHead, date) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/resident_evacuation/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resident: resident,
          evacuation: evacuation,
          isHead: isHead,
          date: date,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const resEvacUpdate = async (id, resident, evacuation, isHead, date) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/resident_evacuation/" + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resident: resident,
          evacuation: evacuation,
          isHead: isHead,
          date: date,
        }),
      }
    );
    const data = await response.json();
    // alert("Updated!");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const resEvacDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/resident_evacuation/" + id, {
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
