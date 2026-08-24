"use strict";

const myLibrary = [];
const container = document.querySelector(".container");
const addBook = document.querySelector("#addBook");
const modal = document.querySelector(".modal");
// const submitBook = document.querySelector("#submitBook");
const radio = document.querySelector("#read");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const close_btn = document.querySelector(".close-btn");

// Functions:
const Book = function (title, author, pages, isRead = false, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
};

const addBookToLibrary = function (title, author, pages, isRead) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, pages, isRead, id);

  myLibrary.push(newBook);
};

const newBookCard = (book, replace = false) => {
  const div = !replace
    ? `
      <div class='card' data-id='${book.id}'>
              <div>
                    <h3>Title:</h3>
                    <p>${book.title}</p>
              </div>
              <div>
                    <h3>Author:</h3>
                    <p>${book.author}</p>
              </div>
              <div>
                    <h3>Pages:</h3>
                    <p>${book.pages}</p>  
              </div>
              <div>
                <h3>Read:</h3>
                <p>${book.isRead ? "✔️" : "❌"}</p>
              </div>
              <div>
                <button type="button" class="read-toggle-btn"><i class="fa-solid fa-book-open"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
              </div>
        </div>
    `.trim()
    : `
       <div>
                    <h3>Title:</h3>
                    <p>${book.title}</p>
              </div>
              <div>
                    <h3>Author:</h3>
                    <p>${book.author}</p>
              </div>
              <div>
                    <h3>Pages:</h3>
                    <p>${book.pages}</p>  
              </div>
              <div>
                <h3>Read:</h3>
                <p>${book.isRead ? "✔️" : "❌"}</p>
              </div>
              <div>
                <button type="button" class="read-toggle-btn"><i class="fa-solid fa-book-open"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
              </div>`.trim();

  return div;
};

const displayBook = (book) => {
  container.insertAdjacentHTML("beforeend", newBookCard(book));
};

// -------- Event Listeners ---------
addBook.addEventListener("click", function () {
  modal.classList.remove("hidden");
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // const currentTitle = title.value;
  // const currentAuthor = author.value;
  // const currentPages = pages.value;
  // const isRead = radio.checked;

  addBookToLibrary(title.value, author.value, pages.value, radio.checked);
  modal.classList.add("hidden");
  displayBook(myLibrary.at(-1));

  title.value = "";
  author.value = "";
  pages.value = "";
  radio.checked = false;
});

container.addEventListener("click", (e) => {
  const deleteBook = e.target.closest(".delete-btn");
  const readToggleBtn = e.target.closest(".read-toggle-btn");
  const card = e.target.closest(".card");
  if (!card) return;
  const nodeList = document.getElementsByClassName("card");
  const index = myLibrary.findIndex((book) => book.id === card.dataset.id);

  if (deleteBook) {
    if (index !== -1) {
      myLibrary.splice(index, 1);
      card.remove();
    }
  } else if (readToggleBtn) {
    if (index !== -1) {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      const newDiv = document.createElement("div");
      newDiv.dataset.id = myLibrary[index].id;
      newDiv.classList.add("card");
      newDiv.innerHTML = newBookCard(myLibrary[index], true);
      nodeList[index].replaceWith(newDiv);
    }
  }
});

close_btn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
