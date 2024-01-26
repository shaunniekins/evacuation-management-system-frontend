import { useState, useEffect } from "react";

export const UsersList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/users/");
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
  imageFile // pass the image file as a separate argument
) => {
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
    formData.append("image", imageFile); // append the image file to the FormData object

    const response = await fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      body: formData, // send the FormData object as the request body
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
    formData.append("image", imageFile); // append the image file to the FormData object

    const response = await fetch("http://127.0.0.1:8000/api/users/" + id, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();
    // alert("Updated!");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const UserDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/users/" + id, {
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
