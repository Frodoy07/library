"use strict";

const myLibrary = [];
const container = document.querySelector(".container");
const addBook = document.querySelector("#addBook");
const modal = document.querySelector(".modal");
const radio = document.querySelector("#read");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const close_btn = document.querySelector(".close-btn");

// Functions:
class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this._id = crypto.randomUUID();
  }

  addToLibrary() {
    myLibrary.push(this);
  }
}

const newBookCard = (book) => {
  const div = `
      <div class='card' data-id='${book._id}'>
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
              <div class="read-status">
                <h3>Read:</h3>
                <p>${book.isRead ? "✔️" : "❌"}</p>
              </div>
              <div>
                <button type="button" class="read-toggle-btn"><i class="fa-solid fa-book-open"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
              </div>
        </div>
    `.trim();

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

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    radio.checked,
  );
  newBook.addToLibrary();
  modal.classList.add("hidden");
  displayBook(myLibrary.at(-1));

  form.reset();
});

container.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  const deleteBook = e.target.closest(".delete-btn");
  const readToggleBtn = e.target.closest(".read-toggle-btn");
  const readStatus = card.querySelector(".read-status p");

  if (!card) return;
  const index = myLibrary.findIndex((book) => book._id === card.dataset.id);

  if (deleteBook) {
    if (index !== -1) {
      console.log("clicked");
      myLibrary.splice(index, 1);
      card.remove();
    }
  } else if (readToggleBtn) {
    console.log("toggle clicked");
    if (index !== -1) {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      readStatus.textContent = `${myLibrary[index].isRead ? "✔️" : "❌"}`;
    }
  }
});

close_btn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
