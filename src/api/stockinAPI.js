export const StockinList = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/stockin");
  let data = await response.json();

  return data;
};

export const StockinAdd = async (
  givenBy,
  donor,
  dateReceived,
  item,
  // itemUnit,
  qty,
  expir_date
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/stockin/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id: null,
        givenBy: givenBy,
        donor: donor,
        dateReceived: dateReceived,
        item: item,
        qty: qty,
        expir_date: expir_date,
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
  item,
  // itemUnit,
  qty,
  expir_date
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/stockin/" + id, {
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
        expir_date: expir_date,
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

export const StockinDelete = (id) => {
  fetch("http://127.0.0.1:8000/api/stockin/" + id, {
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
};
