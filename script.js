
document.addEventListener("DOMContentLoaded", () => { 
  const hideButton = document.getElementById("hideButton");
  const vendedoresTable = document.getElementById("VendedoresTable");

  hideButton.addEventListener("click", () => { 
    if (vendedoresTable.style.display === "none") {
      vendedoresTable.style.display = "block";
    } else {
      vendedoresTable.style.display = "none";
    }
  });
});

