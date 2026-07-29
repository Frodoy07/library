"use strict";

const myLibrary = [];
const container = document.querySelector(".container");

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

displayLibrary();
