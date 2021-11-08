/* eslint-disable no-undef */

{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      books: '.books-list',
    },

    filters: '.filters',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const classNames = {
    book: {
      favorite: 'favorite',
      filtered: 'hidden',
    }
  };

  const filters = [],
    favoriteBooks = [];


  class BooksList{
    constructor(){
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
    }

    initData(){
      const thisBook = this;

      thisBook.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;

      thisBook.dom = {};

      thisBook.dom.coverImages = document.querySelector(select.containerOf.books);
      thisBook.dom.filterForm = document.querySelector(select.filters);
    }

    render(){
      const thisBook = this;

      for(let book of thisBook.data){
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.bookTemplate(book);

        thisBook.element = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.books);

        bookContainer.appendChild(thisBook.element);


      }
    }

    initActions(){
      const thisBook = this;

      thisBook.dom.coverImages.addEventListener('dblclick', function(event){
        event.preventDefault();

        const bookId = event.target.offsetParent.getAttribute('data-id');
        const indexOf = favoriteBooks.indexOf(bookId);

        if(!favoriteBooks[indexOf]){
          event.target.offsetParent.classList.add(classNames.book.favorite);
          if(bookId) favoriteBooks.push(bookId);
        } else{
          event.target.offsetParent.classList.remove(classNames.book.favorite);
          favoriteBooks.splice(indexOf, 1);
        }
      });

      thisBook.dom.filterForm.addEventListener('click', function (event){

        const filterValue = event.target.getAttribute('value');
        const indexOf = filters.indexOf(filterValue);

        if(event.target.checked){
          filters.push(filterValue);
        } else{
          filters.splice(indexOf, 1);
        }

        thisBook.filterBooks();
      });

    }

    filterBooks(){
      const thisBook = this;

      for(let book of thisBook.data){
        let shouldBeHidden = false;

        for(let filter of filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        const bookImage =  document.querySelector('.book__image[data-id="' + book.id + '"]');
        console.log(bookImage);
        if(shouldBeHidden == true){
          bookImage.classList.add(classNames.book.filtered);
        } else {
          bookImage.classList.remove(classNames.book.filtered);
        }
      }
    }

    determineRatingBgc(rating){
      if(rating<6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      if(rating>6 && rating <=8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      if(rating>8 && rating <=9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      if(rating>9) return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

  }

  const app = new BooksList();
  console.log(app);

}