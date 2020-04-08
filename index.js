console.log('JS Connected');

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
    console.log('Adding to UI');
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;

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
    }, 3000);

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
