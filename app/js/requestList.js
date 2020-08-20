let data = RequestList;
let getSomething = document.getElementsByClassName("listOfReq");
let table = document.querySelectorAll("tbody tr");

function InputValue(data, cellList) {
  for (let j = 0; j < cellList.length - 1; j++) {
    if (j != 5) {
      cellList[j].innerHTML = Object.values(data)[j];
    } else {
      titleList = cellList[j].querySelectorAll("span");
      for (let k = 0; k < titleList.length; k++) {
        titleList[k].innerHTML = Object.values(data.title)[k];
      }
    }
  }
}

const getValueOfTable = (() => {
  for (let i = 0; i < data.length; i++) {
    cellList = table[i].querySelectorAll("th,td");
    InputValue(data[i], cellList);
  }
})();

function addRequest() {
  listOfInput = document.querySelectorAll(".form-group input");
  listOfLabel = document.querySelectorAll(".form-group label");
  //   for (let i = 0; i < listOfInput.length; i++) {
  //     if (listOfInput[i].value.length == 0) {
  //       alert("You haven't enter " + listOfLabel[i].textContent);
  //       location.reload();
  //       break;
  //     }
  //   }
  let newId = 3500 + parseInt(Math.random() * 100);
  let date = new Date();
  let newRequest = {
    id: newId,
    status: "New",
    create_date: "" + date,
    update_date: "" + date,
    server: "" + listOfInput[5].value,
    title: {
      sub_title: "" + listOfInput[0].value,
      request: "" + listOfInput[6].value,
      answer: "",
    },
    request_from: listOfInput[1].value + " " + listOfInput[2].value,
    request_to: listOfInput[3].value + " " + listOfInput[4].value,
  };
  console.log(newRequest);
  let tableBody = document.querySelector("tbody");
  let node = table[0].cloneNode(true);
  tableBody.appendChild(node);
  table = document.querySelectorAll("tbody tr");
  newcell =  table[table.length-1].querySelectorAll("th,td")
  InputValue(newRequest, newcell);
}
