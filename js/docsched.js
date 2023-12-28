
const url ="http://aebackend.test";

// Add an event listener to the form
document.getElementById("form_docsched").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Get form data
    const formData = new FormData(e.target);
  
    try {
      // Send form data to the server (you can use your API endpoint here)
      const response = await fetch(aebackendURL + "/api/sched", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // If the form submission is successful, update the schedule table
        const scheduleData = await response.json(); // Assuming the server returns the updated schedule data
        updateScheduleTable(scheduleData);
      } else {
        console.error("Form submission failed:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  
  // Function to update the schedule table with new data
  function updateScheduleTable(scheduleData) {
    const tableBody = document.getElementById("scheduleTable");
  
    // Create a new row with the schedule data
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${scheduleData.id}</td>
      <td>${scheduleData.day}</td>
      <td>${scheduleData.startTime}</td>
      <td>${scheduleData.endTime}</td>
      <td>
        <button class="btn btn-warning">Edit</button>
      </td>
    `;
  
    // Add the new row to the table
    tableBody.appendChild(newRow);
  }
  