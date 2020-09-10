(() => {
        const inputName = document.querySelector('[data-form="name"]');
        const inputLastName = document.querySelector('[data-form="lastName"]');
        const dateOfBirth = document.querySelector('[data-form="dateOfBirth"]');
        const gender = document.querySelectorAll('input[name="gender"]');
        const tableBody = document.querySelector(".tbody");
        const form = document.querySelector(".form");
        const btnEdit = document.querySelector(".btn-edit");

        let currentDB;
        let personData = JSON.parse(window.localStorage.getItem("personData"))
            ? JSON.parse(window.localStorage.getItem("personData"))
            : [];

        personGender = (gender) => (gender[0].checked ? "Erkek" : "Kadın");

        createPerson = ({id, name, lastName, dateOfBirth, gender}) => {
            return {id, name, lastName, dateOfBirth, gender};
        }

        generateID = () => {
            return (
                "_" +
                Math.random()
                    .toString(36)
                    .substr(2, 10)
            )
        }

        generateTable = () => {
            if (personData) {
                return personData
                    .map(
                        (personList) =>
                            `
                               <tr>
                                 <td> ${personList.name} </td>
                                 <td> ${personList.lastName} </td>
                                 <td> ${personList.dateOfBirth.split("-").reverse().join("-")} </td>
                                 <td> ${personList.gender} </td>
                                 <td>
                                 <button onclick="editPerson(event)" class="btn-remove-person">
                                 <span id="${personList.id}" class="fas fa-pen-square"></span>
                                 </button>
                                 </td>
                                 <td>
                                 <button onclick="removePerson(event)" class="btn-remove-person">
                                 <span id="${personList.id}" class="fas fa-trash"></span></td>
                                 </button>
                                </tr>
                            `
                    )
                    .join("");
            }
        }

        showPersonList = () => {
            tableBody ? (tableBody.innerHTML = generateTable()) : null
        }

        clearInputs = () => {
            inputName.value = "";
            inputLastName.value = "";
            dateOfBirth.value = "";
            gender[0].checked = false
            gender[1].checked = false
        }


        handleSubmit = () => {
            event.preventDefault();
            personData.push(
                createPerson({
                    id: generateID(),
                    name: inputName.value,
                    lastName: inputLastName.value,
                    dateOfBirth: dateOfBirth.value,
                    gender: personGender(gender)
                })
            );
            setItemPerson(personData);
            showPersonList();
            clearInputs();
            inputName.focus();
        }

        setItemPerson = (personData) => {
            window.localStorage.setItem("personData", JSON.stringify(personData));
        }

        editItem = () => {
            console.log(currentDB);
            personData.find((data) => data.id === currentDB[0].id).name = inputName.value;
            personData.find((data) => data.id === currentDB[0].id).lastName = inputLastName.value;
            personData.find((data) => data.id === currentDB[0].id).dateOfBirth = dateOfBirth.value;
            personData.find((data) => data.id === currentDB[0].id).gender = personGender(gender)
            console.log(personData);
            setItemPerson(personData);
            showPersonList();
            clearInputs();
            inputName.focus();
        }


        window.removePerson = (e) => {
            const currentItems = personData.filter(
                (data) => data.id !== e.target.id
            );
            //console.log(currentItems);
            window.localStorage.removeItem("personData");
            setItemPerson(currentItems);
            personData = JSON.parse(window.localStorage.getItem("personData"));
            showPersonList();
            clearInputs();
        }

        window.editPerson = (e) => {
            const currentItem = personData.filter(
                (data) => data.id === e.target.id
            );
            //console.log(currentItem);
            inputName.value = currentItem[0].name;
            inputLastName.value = currentItem[0].lastName;
            dateOfBirth.value = currentItem[0].dateOfBirth;
            gender[currentItem[0].gender == "Erkek" ? 0 : 1].checked = true;
            return (currentDB = currentItem)
        }


        showPersonList();
        form.addEventListener("submit", handleSubmit);
        btnEdit.addEventListener("click", editItem);

    }
)();