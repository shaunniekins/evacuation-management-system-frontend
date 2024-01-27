import { useState, useEffect } from "react";

export const EvacueeList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEvacuee();
  }, []);

  const getEvacuee = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/resident");
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const evacueeAdd = async (
  last_name,
  first_name,
  middle_name,
  municipality,
  barangay,
  contact_num,
  gender,
  birthday,
  civil_status,
  occupation,
  resident_status,
  is_pwd,
  is_ip,
  is_head,
  household_num,
  street_add,
  length_of_year
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/resident/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        municipality: municipality,
        barangay: barangay,
        contact_num: contact_num,
        gender: gender,
        birthday: birthday,
        civil_status: civil_status,
        occupation: occupation,
        resident_status: resident_status,
        is_pwd: is_pwd,
        is_ip: is_ip,
        is_head: is_head,
        household_num: household_num,
        street_add: street_add,
        length_of_year: length_of_year,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const evacueeUpdate = async (
  id,
  last_name,
  first_name,
  middle_name,
  municipality,
  barangay,
  contact_num,
  gender,
  birthday,
  civil_status,
  occupation,
  resident_status,
  is_pwd,
  is_ip,
  is_head,
  household_num,
  street_add,
  length_of_year
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/resident/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_name: last_name,
        first_name: first_name,
        middle_name: middle_name,
        municipality: municipality,
        barangay: barangay,
        contact_num: contact_num,
        gender: gender,
        birthday: birthday,
        civil_status: civil_status,
        occupation: occupation,
        resident_status: resident_status,
        is_pwd: is_pwd,
        is_ip: is_ip,
        is_head: is_head,
        household_num: household_num,
        street_add: street_add,
        length_of_year: length_of_year,
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

export const evacueeDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/resident/" + id, {
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
