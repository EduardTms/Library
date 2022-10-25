const form = document.querySelector('#form');
const newBookBtn = document.getElementById('#addBook');
const mainLibrary = document.querySelector('main');
const formError = document.querySelector("#error");

let myLibrary = [
    {
        title: 'The Subtle Art Of Not Giving a F#ck',
        author: 'by Mark Manson',
        cover: 'photos/sublteArt.jpg',
        pages: '204',
        read: 'finished',
    },
    {
        title: 'Atomic Habits',
        author: 'by James Clear',
        cover: 'photos/atomicHabits.jpg',
        pages: '306',
        read: 'unfinished',
    },
    {
        title: 'The 48 Laws of Power',
        author: 'by Robert Greene',
        cover: 'photos/48Laws.jpg',
        pages: '480',
        read: 'finished',
    },
    {
        title: 'Everything is F#cked',
        author: 'by Mark Manson',
        cover: 'photos/everyThing.jpg',
        pages: '288',
        read: 'finished',
    }];

// Book Constructor
function Book(title,author,cover,pages,read)  {
    this.title = title;
    this.author = author;
    this.cover = cover;
    this.pages = pages;
    this.read = read;
}

const addBookToLibrary = () => {
    let everythingFilled = true;
    let title = document.querySelector('input[name=title]');
    let author = document.querySelector('input[name=author]');
    let pages = document.querySelector('input[name=nop]');
    let read = document.querySelector('input[type=checkbox]');
    if(read.checked === true) {
        read = 'finished';
    } else {
        read = 'unfinished';
    }
    let cover = document.querySelector('input[name=cover]');
    if(cover.value === '') {
        cover.value = 'photos/defaultCover.jpg';
    }
    cover.onerror = function() {
        cover.value = "photos/defaultCover.jpg";
    }
    if(title.value === '' || author.value === '' || (pages.value === '' || pages.value < 1)) {
        everythingFilled = false;
        formError.textContent = 'Obligatory field empty!';
    }
    if(everythingFilled === true) {
    formError.textContent = '';
    let newBook = new Book(title.value,author.value,cover.value,pages.value,read);
    myLibrary.push(newBook);
    populateStorage();
    createCard(newBook, myLibrary.length-1);
    form.style.display = 'none';
    }
}

const deleteFromLibrary = (index) => {
    myLibrary.splice(index,1);
    populateStorage();
    // deletes all books from the page before it populates again
    deleteCards();
    populateScreen(myLibrary);
}

const deleteCards = () => {
    const books = document.querySelectorAll('.book');
    books.forEach(book => book.remove());
}

const createCard = (book , index) => {
    const bookCard = document.createElement('div');
    bookCard.id = index;
    bookCard.classList.add('book');
    let cover = document.createElement('img');
    cover.src = book.cover;
    bookCard.appendChild(cover);
    let title = document.createElement('h3');
    title.textContent = book.title;
    title.classList.add('title');
    bookCard.appendChild(title);
    let author = document.createElement('p');
    author.textContent = book.author;
    author.classList.add('author');
    bookCard.appendChild(author);
    let pages = document.createElement('h1');
    pages.textContent = book.pages;
    pages.classList.add('pages');
    bookCard.appendChild(pages);
    let done = document.createElement('p');
    done.classList.add(book.read);
    done.addEventListener('click', (e) => changeReadStatus(e));
    bookCard.appendChild(done);
    let remove = document.createElement('button');
    remove.textContent = "Remove Book";
    remove.classList.add("removeBtn");
    remove.addEventListener('click', () => deleteFromLibrary(index));
    bookCard.appendChild(remove);
    mainLibrary.append(bookCard);
}

const populateScreen = (lib) => {
    for(var i=0; i < lib.length; i++) {
        createCard(lib[i],i);
    }
}

const changeReadStatus = (e) => {
    // get book id 
    const parentId = e.target.parentNode.id;
    if(myLibrary[parentId].read === 'finished') {
        myLibrary[parentId].read = 'unfinished';
        deleteCards()
        populateStorage();
        populateScreen(myLibrary);
    } else if (myLibrary[parentId].read === 'unfinished') {
        myLibrary[parentId].read = 'finished';
        deleteCards();
        populateStorage();
        populateScreen(myLibrary);
    }
} 


// makes the form show up when New Book btn is pressed
const toggleForm = () => {
    form.classList.toggle('hidden');
}

// add Library to browser localStorage
const populateStorage = () => {
    localStorage.setItem("storedLibrary", JSON.stringify(myLibrary))
}

// restore contents of myLibrary when user refreshes the page
const restore = () => {
    // if local storage is empty, display contents of myLibrary
    if (!localStorage.storedLibrary) {
        populateScreen(myLibrary);
    } else {
    let restoredObjects = localStorage.getItem('storedLibrary');
    restoredObjects = JSON.parse(restoredObjects);
    myLibrary = restoredObjects;
    populateScreen(myLibrary);
    }
}

// when the user loads page for first time, they will see the example books
// after that, any changes they make to the array will be saved to the localStorage
// to clear local storage, go to Console -> Application, Local Storage, right click File and Clear.
restore();