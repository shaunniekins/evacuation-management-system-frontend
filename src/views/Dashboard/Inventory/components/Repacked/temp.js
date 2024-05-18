const handleSubmit = async (event) => {
  event.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    const items = parseInt(inputs[i].items);
    const units = unitsValues[i];
    const qty = parseFloat(inputs[i].qty);

    try {
      const selectedItem = inventoryList.find(
        (invItem) => invItem.item === items
      );

      if (!selectedItem || parseFloat(selectedItem.qty) < qty) {
        const matchingItemEntry = itemEntry.find(
          (entry) => parseInt(entry.id) === parseInt(items)
        );
        alert(
          `The input value of ${qty} ${units} of ${
            matchingItemEntry ? matchingItemEntry.name : ""
          } exceeds the available inventory.`
        );
      } else {
        updateAPI();
      }
    } catch (error) {
      alert(`Failed: ${error}`);
    }
  }

  // const updateAPI = () => {
  const barangay = event.target.barangay.value;
  const date = event.target.date.value;

  const results = [];

  for (let i = 0; i < inputs.length; i++) {
    const items = parseInt(inputs[i].items);
    const units = unitsValues[i];
    const qty = parseInt(inputs[i].qty);

    try {
      const result = await DistributeBarangayInventoryAdd(
        items,
        units,
        qty,
        barangay,
        date
      );
      results.push(result);
    } catch (error) {
      alert(`Failed to distribute item ${item}`);
    }

    try {
      let itemExists = false;

      barangayInventoryList.map(async (entry) => {
        if (entry.items === items) {
          itemExists = true;
          const newQty = parseFloat(entry.qty) + parseFloat(qty);
          // console.log("newQty: ", newQty);

          const resultInventory = await BarangayInventoryUpdate(
            entry.id,
            items,
            units,
            newQty,
            barangay
          );
        }
      });
      // console.log("truth: ", itemExists);

      if (!itemExists) {
        const resultInventory = await BarangayInventoryAdd(
          items,
          units,
          qty,
          barangay
        );
      }
      // console.log("truth: ", itemExists);
    } catch (error) {
      alert("Failed");
    }
  }

  if (results.length !== inputs.length)
    console.log("Some items failed to distribute");

  const namesString = inputs.map((input) => input.items).join(", ");
  const qtyString = inputs.map((input) => input.qty).join(", ");
  const unitsString = unitsValues.join(", ");

  const itemsArr = namesString.split(",");
  const qtyArr = qtyString.split(",");

  try {
    const results = [];

    for (let i = 0; i < itemsArr.length; i++) {
      const items = parseInt(itemsArr[i].trim());
      const matchingInventoryItem = inventoryList.find(
        (inventoryItem) => inventoryItem.item === items
      );

      if (matchingInventoryItem) {
        const id = matchingInventoryItem.id;
        const qtyEach = qtyArr[i].trim();
        const qty = parseFloat(matchingInventoryItem.qty) - parseFloat(qtyEach);

        const resultInventory = await InventoryUpdate(id, items, qty);
        results.push(resultInventory);
      }
    }
    onClose();
  } catch (error) {
    alert("Failed");
  }
  // }
};
