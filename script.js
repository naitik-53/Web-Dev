// 1. input field ko pakad lo
const searchInput = document.getElementById("searchInput");

// 2. saare list items pakad lo
const listItems = document.querySelectorAll("#userList li");

// 3. input par event lagao
searchInput.addEventListener("input", function () {

  // 4. user ne jo type kiya usse lo
  const searchText = searchInput.value.toLowerCase();

  // 5. har list item ko check karo
  listItems.forEach(function (item) {

    // 6. list item ka text lo
    const itemText = item.textContent.toLowerCase();

    // 7. compare karo
    if (itemText.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

  });

});
