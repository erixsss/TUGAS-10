var todos = [];
const inputDOM = document.getElementById("input");
const listULDOM = document.getElementById("listUL");
var dataStorage = localStorage.getItem("todos");
const sisaTodoDOM = document.getElementById("sisaTodo");

getDataStorage();
function getDataStorage() {
  if (dataStorage === null) {
    dataStorage = [];
  } else {
    todos = JSON.parse(dataStorage);
    tambah();
  }
}

function kirim() {
  if (inputDOM.value === "") {
    alert("Tulis Rencanamu Hari ini...");
  } else {
    const valueInput = inputDOM.value;
    var dataTodos = {
      nama: valueInput,
      status: false
    };
    todos.push(dataTodos);
    // console.log(todos);
    // console.log(todos.length);
    localStorage.setItem("todos", JSON.stringify(todos));
    inputDOM.value = "";
    // listULDOM.innerHTML = "";
    tambah();
  }
}

function tambah() {
  listULDOM.innerHTML = "";
  var index = 0;
  while (index < todos.length) {
    if (todos[index].status === true) {
      listULDOM.innerHTML +=
        '<li class="list-group-item transparan"><span><input type="checkbox" onchange="klikBerubah(' +
        index +
        ')" style="margin-right: 5px" checked></span><s >' +
        todos[index].nama +
        '</s><span type="button" onclick="hapus(' +
        index +
        ')" class="btn-close">X</span></li>';
    } else {
      listULDOM.innerHTML +=
        '<li class="list-group-item transparan"><span><input type="checkbox" onchange="klikBerubah(' +
        index +
        ')" style="margin-right: 5px"></span>' +
        todos[index].nama +
        '<span type="button" onclick="hapus(' +
        index +
        ')" class="btn-close">X</span></li>';
    }
    index++;
  }
  hitungSisatodo();
}

function resett() {
  localStorage.clear();
  listULDOM.innerHTML = "";
  inputDOM.value = "";
  todos = [];
  sisaTodoDOM.innerHTML = "";
}

inputDOM.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("button-kirim").click();
  }
});

function hapus(a) {
  todos.splice(a, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // listULDOM.innerHTML = "";
  tambah();
}

function klikBerubah(b) {
  if (todos[b].status === true) {
    todos[b].status = false;
  } else {
    todos[b].status = true;
  }
  // console.log("list todo ke "+[b]+ " adalah " +todos[b].status)
  localStorage.setItem("todos", JSON.stringify(todos));
  tambah();
}

function tampilkanJam() {
  var jamSekarang;
  var dateDOM = new Date();
  jamSekarang = dateDOM.getHours() + ":" + dateDOM.getMinutes();
  document.getElementById("jam").innerHTML = jamSekarang;
  setTimeout("tampilkanJam()", 0);
}

function hitungSisatodo() {
  var c = 0;
  var bindex = 0;
  while (bindex < todos.length) {
    if (todos[bindex].status === false) {
      c++;
    }
    bindex++;
  }
  sisaTodoDOM.innerHTML = c + " TODO";
  console.log(c);
}
