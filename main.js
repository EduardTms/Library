const form = document.querySelector('#form');
const newBookBtn = document.getElementById('#addBook');
const mainLibrary = document.querySelector('main');
let myLibrary = [
    {
        title: 'The Subtle Art Of Not Giving a F#ck',
        author: 'by Mark Manson',
        cover: 'photos/sublteArt.jpg',
        pages: '204',
        read: 'finished'
    },
    {
        title: 'Atomic Habits',
        author: 'by James Clear',
        cover: 'photos/atomicHabits.jpg',
        pages: '306',
        read: 'unfinished'
    },
    {
        title: 'The 48 Laws of Power',
        author: 'by Robert Greene',
        cover: 'photos/48Laws.jpg',
        pages: '480',
        read: 'finished'
    },
    {
        title: 'Everything is F#cked',
        author: 'by Mark Manson',
        cover: 'photos/everyThing.jpg',
        pages: '288',
        read: 'finished'
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
    let title = document.querySelector('input[name=title]');
    let author = document.querySelector('input[name=author]');
    let pages = document.querySelector('input[name=nop]');
    console.log("pages:" + pages);
    let read = document.querySelector('input[name=read].checked');
    if(read === false) {
        read = 'unfinished';
    }
    read = 'finished';
    let cover = 'photos/defaultCover';
    try {
        cover = document.querySelector('input[name=cover]');
    } catch(err) {
        cover = 'photos/defaultCover';
    }
    if(cover.value === 'undefined' || cover.value === null) {
        cover = 'photos/defaultCover';
    }
    let newBook = new Book(title.value,author.value,cover.value,pages.value,read.value);
    myLibrary.push(newBook);
    createCard(newBook);
}

const createCard = (book) => {
    const div = document.createElement('div');
    div.classList.add('book');
    let cover = document.createElement('img');
    cover.src = book.cover;
    div.appendChild(cover);
    let title = document.createElement('h3');
    title.textContent = book.title;
    title.classList.add('title');
    div.appendChild(title);
    let author = document.createElement('p');
    author.textContent = book.author;
    author.classList.add('author');
    div.appendChild(author);
    let pages = document.createElement('h1');
    pages.textContent = book.pages;
    pages.classList.add('pages');
    div.appendChild(pages);
    let done = document.createElement('p');
    done.classList.add(book.read);
    div.appendChild(done);
    mainLibrary.append(div);
}

const populateScreen = (lib) => {
    lib.forEach(arrayItem => {
        createCard(arrayItem);
    })
}


populateScreen(myLibrary);

// makes the form show up when New Book btn is pressed
const toggleForm = () => {
    form.style.display = "block";
}

