"use strict";

const myLibrary = [];
const container = document.querySelector(".container");
const addBook = document.querySelector("#addBook");
const modal = document.querySelector(".modal");
const submitBook = document.querySelector("#submitBook");
const radio = document.querySelector("#read");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

const Book = function (title, author, pages, isRead = false, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;

  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "is read already." : "not read yet."}`,
    );
  };
};

const addBookToLibrary = function (title, author, pages, isRead) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, pages, isRead, id);

  myLibrary.push(newBook);
};

addBookToLibrary("Rich Dad, Poor Dad", "Robert Kiyosaki", 400, false);
addBookToLibrary("The Personal MBA", "Josh Kauffman", 540, false);
addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 220, false);

const displayLibrary = function () {
  myLibrary.forEach((el) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
              <div>
                    <h3>Title:</h3>
                    <p>${el.title}</p>
              </div>
              <div>
                    <h3>Author:</h3>
                    <p>${el.author}</p>
              </div>
              <div>
                    <h3>Pages:</h3>
                    <p>${el.pages}</p>
              </div>
        </div>
      `,
    );
  });
};

// -------- Event Listeners ---------
radio.addEventListener("click", (event) => {
  if (event.target.dataset.wasChecked === "true") {
    event.target.checked = false;
    event.target.dataset.wasChecked = "false";
  } else {
    event.target.checked = true;
    event.target.dataset.wasChecked = "true";
  }
});
addBook.addEventListener("click", function () {
  modal.classList.remove("hidden");
});
submitBook.addEventListener("click", function (e) {
  e.preventDefault();
  const currentTitle = title.value;
  const currentAuthor = author.value;
  const currentPages = pages.value;
  const isRead = radio.checked;

  console.log(currentTitle, currentAuthor, currentPages, isRead);
  addBookToLibrary(title.value, author.value, pages.value, radio.checked);
  console.log(myLibrary);
  modal.classList.add("hidden");
  displayLibrary();
});
