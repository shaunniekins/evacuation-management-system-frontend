export const ItemList = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/items");
  let data = await response.json();

  // console.log("itemList: ", data);

  return data;
};

export const ItemAdd = async (name, unit) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/items/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        name: name,
        unit: unit,
      }),
    });
    const data = await response.json(); // Parse the response body as JSON

    return data; // This will now be the inserted data
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const ItemUpdate = async (id, name, unit) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/items/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        unit: unit,
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

export const ItemDelete = (id) => {
  fetch("http://127.0.0.1:8000/api/items/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    // .then(() => {
    //   console.log("Deleted!");
    // })
    .catch((error) => {
      console.log(error);
    });
};
