import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const UsersList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let response = await fetch(`${BASE_URL}/api/users/`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const UserAdd = async (
  id,
  password,
  is_superuser,
  username,
  first_name,
  last_name,
  email,
  is_staff,
  municipality,
  barangay,
  position,
  contact_number,
  imageFile 
) => {
  try {
    const formData = new FormData();
    formData.append("id", null);
    formData.append("password", password);
    formData.append("is_superuser", is_superuser);
    formData.append("username", username);
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("email", email);
    formData.append("is_staff", is_staff);
    formData.append("municipality", municipality);
    formData.append("barangay", barangay);
    formData.append("position", position);
    formData.append("contact_number", contact_number);
    formData.append("image", imageFile);

    const response = await fetch(`${BASE_URL}/api/users/`, {
      method: "POST",
      body: formData, 
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const UserUpdate = async (
  id,
  password,
  is_superuser,
  username,
  first_name,
  last_name,
  email,
  is_staff,
  municipality,
  barangay,
  position,
  contact_number,
  imageFile
) => {
  // console.log("iamgeFile api: ", imageFile);

  try {
    const formData = new FormData(); // create a new FormData object
    formData.append("id", null);
    formData.append("password", password);
    formData.append("is_superuser", is_superuser);
    formData.append("username", username);
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("email", email);
    formData.append("is_staff", is_staff);
    formData.append("municipality", municipality);
    formData.append("barangay", barangay);
    formData.append("position", position);
    formData.append("contact_number", contact_number);
    formData.append("image", imageFile); 

    const response = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const UserDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/users/${id}`, {
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