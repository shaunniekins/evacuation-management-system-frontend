import { useState, useEffect } from "react";

export const MunicipalityList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getMunicipality();
  }, []);

  const getMunicipality = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/municipality");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const MunicipalityAdd = async (name, province) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/municipality/", {
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
    const response = await fetch(
      "http://127.0.0.1:8000/api/municipality/" + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          province: province,
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

export const MunicipalityDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/municipality/" + id, {
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
