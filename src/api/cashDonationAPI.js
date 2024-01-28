import { useState, useEffect } from "react";

export const cashDonationList = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/cashdonation");
  let data = await response.json();

  return data;
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
    const response = await fetch("http://127.0.0.1:8000/api/cashdonation/", {
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
      "http://127.0.0.1:8000/api/cashdonation/" + id,
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
  fetch("http://127.0.0.1:8000/api/cashdonation/" + id, {
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
};
