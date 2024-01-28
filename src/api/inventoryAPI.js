export const InventoryList = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/inventory");
  let data = await response.json();

  return data;
};

// export const InventoryList = async () => {
//   let response = await fetch("http://127.0.0.1:8000/api/inventory");
//   let data = await response.json();

//   return data;
// };

export const InventoryAdd = async (item, qty) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/inventory/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        item: item,
        qty: qty,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const InventoryUpdate = async (id, item, qty) => {
  // console.log("id: ", id);
  // console.log("item: ", item);
  // console.log("qty: ", qty);
  try {
    const response = await fetch("http://127.0.0.1:8000/api/inventory/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        qty: qty,
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

export const InventoryDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    fetch("http://127.0.0.1:8000/api/inventory/" + id, {
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
