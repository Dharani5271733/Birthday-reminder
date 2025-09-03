

const API_URL = "http://localhost:3000"; // Change to your backend URL when deployed

// Add birthday
document.getElementById("birthdayForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;

  const res = await fetch(`${API_URL}/birthday`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, dob })
  });

  const data = await res.json();
  alert(data.message);
  loadBirthdays(); // refresh list
  e.target.reset();
});

// Load birthdays
async function loadBirthdays() {
  const res = await fetch(`${API_URL}/birthday`);
  const birthdays = await res.json();

  const list = document.getElementById("birthdayList");
  list.innerHTML = "";

  birthdays.forEach(b => {
    const li = document.createElement("li");

    // Left side → birthday info
    const info = document.createElement("span");
    info.className = "birthday-info";
    info.textContent = `${b.name} - ${new Date(b.dob).toDateString()}`;

    // Right side → buttons
    const btnGroup = document.createElement("div");
    btnGroup.className = "button-group";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = async () => {
      const newName = prompt("Enter new name", b.name);
      const newDob = prompt("Enter new DOB (YYYY-MM-DD)", b.dob);
      if (newName && newDob) {
        await fetch(`${API_URL}/birthday/${b.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName, dob: newDob })
        });
        loadBirthdays();
      }
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";
    delBtn.onclick = async () => {
      await fetch(`${API_URL}/birthday/${b.id}`, { method: "DELETE" });
      loadBirthdays();
    };

    // Add buttons into group
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    // Add info + buttons into li
    li.appendChild(info);
    li.appendChild(btnGroup);

    list.appendChild(li);
  });
}

// Load on start
loadBirthdays();
