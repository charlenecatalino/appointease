import { setRouter } from "../router/router.js";

// Set Router
setRouter();

// Backend URL
const aebackendURL = "http://aebackend.test";

// Get Logged User Profile
async function getLoggedPatient() {
  // Access User Profile API Endpoint
  const response = await fetch(aebackendURL + "/api/patient/show", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  // Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();

    document.getElementById("user_logged").innerHTML =
      json.firstname + " " + json.lastname;

    if (document.getElementById("patient_id")) {
      document.getElementById("patient_id").value = json.id;
    }
  }
  // Get response if 400 or 500 status code
  else {
    const json = await response.json();

    errorNotification(json.message, 10);
  }
}

// // Show Admin Pages Navigation
// function showNavAdminPages() {
//   if (localStorage.getItem("role") == "Admin") {
//     document.getElementById(
//       "nav_admin_pages"
//     ).innerHTML = `<div class="sb-sidenav-menu-heading">Admin Pages</div>
//         <a class="nav-link active" href="users.html">
//           <div class="sb-nav-link-icon">
//             <i class="fas fa-user"></i>
//           </div>
//           Users
//         </a>`;
//   }
// }

// Notifications
function successNotification(message, seconds = 0) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

function errorNotification(message, seconds = 0) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}

export {
  aebackendURL,
  successNotification,
  errorNotification,
  getLoggedPatient,
};
