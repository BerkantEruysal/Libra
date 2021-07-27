let myLibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  if(!myLibrary){myLibrary = []}
  myLibrary.push(newBook);
}
function initBook(bookObject) {
  const book = document.createElement("div");
  const deleteButton = document.createElement("button");
  const ul = document.createElement("ul");
  const title = document.createElement("li");
  const author = document.createElement("li");
  const pages = document.createElement("li");
  const isRead = document.createElement("li");
  const trashCanIcon = document.createElement("img")

  book.className = "book";
  deleteButton.className = "book-delete-button";
  title.className = "book-title";
  author.className = "book-author";
  pages.className = "book-pages";
  isRead.className = "book-is-read";
  
  trashCanIcon.src = "icons8-trash-24.png"
  title.innerHTML = `Title:  ${bookObject.title}`;
  author.innerHTML = `Author: ${bookObject.author}`;
  pages.innerHTML = `Pages: ${bookObject.pages}`;
  isRead.innerHTML = `${
    bookObject.read ? "The book is finished" : "Not finished yet"
  }`;

  book.addEventListener("transitionend", () => {
    book.remove();
    myLibrary.splice(bookObject.id, 1);
    saveList();
  });
  deleteButton.addEventListener("click", () => {
    book.classList.add("remove-effect");
  });

  deleteButton.appendChild(trashCanIcon)
  ul.appendChild(deleteButton);
  ul.appendChild(title);
  ul.appendChild(author);
  ul.appendChild(pages);
  ul.appendChild(isRead);

  book.appendChild(ul);

  document.getElementById("list").appendChild(book);
}
function createBookForm() {
  document.getElementById("form-visibility").className = "visible";
}
function submitBookForm() {
  const title = document.getElementById("title-input").value;
  const author = document.getElementById("author-input").value;
  const pages = document.getElementById("pages-input").value;
  const isRead = document.getElementById("is-read-input").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, isRead);
    saveList();
    refreshList();
    closeForm();

    return;
  }
  alert("Please Fill All The Fields");
}
function closeForm() {
  document.getElementById("new-book-form").reset();
  document.getElementById("form-visibility").className = "unvisible";
}
function refreshList() {
  document.getElementById("list").innerHTML = "";
  if (myLibrary) {
    myLibrary.forEach((book) => {
      initBook(book);
    });
  }
}
function saveList() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}
function loadList() {
  
   JSON.parse(localStorage.getItem("library")) != null 
    myLibrary = JSON.parse(localStorage.getItem("library"));
    let idCounter = 0;
    myLibrary.forEach((book) => {
      book.id = idCounter;
      idCounter++;
    });
    
  
  
  refreshList()
}

// Loads the local storage if it's exists
loadList();


// Prevents the create book button from refreshing the page
document.getElementById("create-button").addEventListener("click", (event) => {
  event.preventDefault();
});



