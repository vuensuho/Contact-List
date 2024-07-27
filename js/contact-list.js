let contactList = [];

const submitBtn = document.getElementById("submit");

// add contact
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let contactInfo = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  };

  const { value: firstname } = document.getElementById("firstname");
  const { value: lastname } = document.getElementById("lastname");
  const { value: email } = document.getElementById("email");
  const { value: phoneNumber } = document.getElementById("phone-number");

  if (
    !firstname == "" &&
    !lastname == "" &&
    !email == "" &&
    !phoneNumber == ""
  ) {
    if (validateEmail(email)) {
      if(phoneNumber.length == 11) {
        contactInfo.firstname = firstname;
        contactInfo.lastname = lastname;
        contactInfo.email = email;
        contactInfo.phoneNumber = phoneNumber;

        const newContactList = { ...contactInfo };

        contactList.push(newContactList);
        document.getElementById("form-control").reset();
        displayContactList();
      } else {
        const phoneNumberPrompt = document.querySelector(".phonenumber-prompt-container");
        const phoneNuberOkBtn = document.querySelector(".phonenumber-ok-btn");

        phoneNumberPrompt.classList.add("active");

        phoneNuberOkBtn.onclick = (e) => {
          e.preventDefault();
          phoneNumberPrompt.classList.remove("active");
        };
      }
    } else {
      const emailPrompt = document.querySelector(".email-prompt-container");
      const emailOkBtn = document.querySelector(".email-ok-btn");

      emailPrompt.classList.add("active");

      emailOkBtn.onclick = (e) => {
        e.preventDefault();
        emailPrompt.classList.remove("active");
      };
    }
  } else {
    const fillupPrompt = document.querySelector(".fillup-prompt-container");
    const okBtn = document.querySelector(".ok-btn");

    fillupPrompt.classList.add("active");

    okBtn.onclick = (e) => {
      e.preventDefault();
      fillupPrompt.classList.remove("active");
    };
  }
});

// display contact list
function displayContactList() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  tableBody.innerHTML = `
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Edit/Delete</th>
    </tr>`;

  contactList.forEach((contact, index) => {
    const row = document.createElement("tr");

    const firstnameCell = document.createElement("td");
    firstnameCell.innerText = contact.firstname;
    row.appendChild(firstnameCell);

    const lastnameCell = document.createElement("td");
    lastnameCell.innerText = contact.lastname;
    row.appendChild(lastnameCell);

    const emailCell = document.createElement("td");
    emailCell.innerText = contact.email;
    row.appendChild(emailCell);

    const phoneNumberCell = document.createElement("td");
    phoneNumberCell.innerText = contact.phoneNumber;
    row.appendChild(phoneNumberCell);

    const controlCell = document.createElement("td");
    controlCell.innerHTML = `<button class="edit-btn" onclick="editContact(${index})">Edit</button>
                            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>`;
    row.appendChild(controlCell);

    tableBody.appendChild(row);
  });
}

// edit contact details
function editContact(i) {
  const popupContainer = document.querySelector(".popup-container");
  const closeBtn = document.querySelector(".close-btn");
  const saveBtn = document.querySelector(".save-btn");

  popupContainer.classList.add("active");

  const editFname = document.getElementById("edit-firstname");
  const editLname = document.getElementById("edit-lastname");
  const editEmail = document.getElementById("edit-email");
  const editPhoneNumber = document.getElementById("edit-phone-number");

  editFname.value = contactList[i].firstname;
  editLname.value = contactList[i].lastname;
  editEmail.value = contactList[i].email;
  editPhoneNumber.value = contactList[i].phoneNumber;
  
  saveBtn.onclick = (e) => {
    e.preventDefault();

    // check if the fields are empty upon editing
    if (!editFname.value.trim() || !editLname.value.trim() || !editEmail.value.trim() || !editPhoneNumber.value.trim()) {
      const fillupPrompt = document.querySelector(".fillup-prompt-container");
      const okBtn = document.querySelector(".ok-btn");

      fillupPrompt.classList.add("active");

      okBtn.onclick = (e) => {
        e.preventDefault();
        fillupPrompt.classList.remove("active");
      };
    } else {
      if(validateEmail(editEmail.value)) {
        if(!editPhoneNumber.value.trim() || editPhoneNumber.value.length != 11) {
          const phoneNumberPrompt = document.querySelector(".phonenumber-prompt-container");
          const phoneNuberOkBtn = document.querySelector(".phonenumber-ok-btn");

          phoneNumberPrompt.classList.add("active");

          phoneNuberOkBtn.onclick = (e) => {
            e.preventDefault();
            phoneNumberPrompt.classList.remove("active");
          };
        } else {
          contactList[i].firstname = editFname.value;
          contactList[i].lastname = editLname.value;
          contactList[i].email = editEmail.value;
          contactList[i].phoneNumber = editPhoneNumber.value;
          popupContainer.classList.remove("active");
          displayContactList(); 
        }
      } else {
        const emailPrompt = document.querySelector(".email-prompt-container");
        const emailOkBtn = document.querySelector(".email-ok-btn");

        emailPrompt.classList.add("active");

        emailOkBtn.onclick = (e) => {
          e.preventDefault();
          emailPrompt.classList.remove("active");
        };
      }
    };
  } 

  closeBtn.onclick = (e) => {
    e.preventDefault();
    popupContainer.classList.remove("active");
  };
}

// delete a single contact on the list
function deleteContact(i) {
  const deletePopupContainer = document.querySelector(
    ".delete-popup-container"
  );
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");

  deletePopupContainer.classList.add("active");

  yesBtn.onclick = (e) => {
    e.preventDefault();
    contactList.splice(i, 1);
    deletePopupContainer.classList.remove("active");
    displayContactList();
  };

  noBtn.onclick = (e) => {
    e.preventDefault();
    deletePopupContainer.classList.remove("active");
  };
}

// validate email
function validateEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
