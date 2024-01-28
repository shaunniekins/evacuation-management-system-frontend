export const BarangayInventoryList = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/barangayinventory");
  let data = await response.json();

  return data;
};

export const BarangayInventoryAdd = async (item, unit, qty, barangay) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/barangayinventory/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id: null,
          item: item,
          unit: unit,
          qty: qty,
          barangay: barangay,
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

export const BarangayInventoryUpdate = async (
  id,
  item,
  unit,
  qty,
  barangay
) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/barangayinventory/" + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: item,
          unit: unit,
          qty: qty,
          barangay: barangay,
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

export const BarangayInventoryDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/barangayinventory/" + id, {
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
