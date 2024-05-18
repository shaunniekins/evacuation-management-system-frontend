import { useState, useEffect } from "react";
import { BASE_URL } from "../urlConfig";

export const cashDonationList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getCashDonation();
  }, []);

  const getCashDonation = async () => {
    let response = await fetch(`${BASE_URL}/api/cashdonation`);
    let data = await response.json();
    setEntries(data);
  };

  return entries;
};

export const cashDonationAdd = async (
  controlNumber,
  givenBy,
  donor,
  amount,
  modeOfTransfer,
  date
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cashdonation/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        controlNumber: controlNumber,
        givenBy: givenBy,
        donor: donor,
        amount: amount,
        modeOfTransfer: modeOfTransfer,
        date: date,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const cashDonationUpdate = async (
  id,
  controlNumber,
  givenBy,
  donor,
  amount,
  modeOfTransfer,
  date
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/cashdonation/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          controlNumber: controlNumber,
          givenBy: givenBy,
          donor: donor,
          amount: amount,
          modeOfTransfer: modeOfTransfer,
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

export const cashDonationDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch(`${BASE_URL}/api/cashdonation/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};