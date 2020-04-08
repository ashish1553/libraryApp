console.log('JS Connected');
showTable();
// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;

}

//Display Constructor
function Display() {

}

//Add Methods to display prototype
Display.prototype.add = function (book) {
    console.log('Adding to LS');
    let Item = localStorage.getItem('Item')
    if (Item == null) {
        libObj = [];
    }
    else {
        libObj = JSON.parse(Item);
    }
    libObj.push(book);
    localStorage.setItem('Item', JSON.stringify(libObj));
    showTable();

}

//Function to show Table
function showTable() {
    let Item = localStorage.getItem('Item')
    if (Item == null) {
        libObj = [];
    }
    else {
        libObj = JSON.parse(Item);
    }
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML='';
    libObj.forEach(function (element, index) {
        let uiString = `<tr>
                            <td>${index + 1}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button id="${index}" onclick="deleteBtn(this.id)" class="btn btn-outline-danger">Delete</button></td>
                        </tr>`;
        tableBody.innerHTML += uiString;
        // console.log(element);

    });
}

//Delete functionality
function deleteBtn(index) {
    let Item = localStorage.getItem('Item')
    if (Item == null) {
        libObj = [];
    }
    else {
        libObj = JSON.parse(Item);
    }
    libObj.splice(index,1)
    localStorage.setItem('Item', JSON.stringify(libObj));
    showTable();
    
}

//Implement the clear functionality
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implement the validate functionality
Display.prototype.validate = function (book) {
    if ((book.name.length < 3) && (book.author.length < 3)) {
        return false;
    }
    else {
        return true;
    }
}

//Implement the Show functionality
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Message: </strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ``;
    }, 2000);

}

//Add submit event listener
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted the form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry you cannot add this book.')
    }

    e.preventDefault();
}







