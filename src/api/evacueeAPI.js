import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const EvacueeList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEvacuee();
  }, []);

  const getEvacuee = async () => {
    let response = await fetch(`${BASE_URL}/api/resident`);
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
  length_of_year,
  is_senior
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/resident/`, {
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
        is_senior: is_senior,
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
  length_of_year,
  is_senior
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/resident/${id}`, {
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
        is_senior: is_senior,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const evacueeDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/resident/${id}`, {
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