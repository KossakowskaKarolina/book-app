{
  'use strict';

  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);


  // eslint-disable-next-line no-undef
  const books = dataSource.books;
  const filters = [];

  const render = function() {
    for(let book of books){
      const generatedHTML = bookTemplate(book);

      // eslint-disable-next-line no-undef
      const element = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector('.books-list');

      bookContainer.appendChild(element);
    }
  };

  const initActions = function(){
    const favoriteBooks = [];

    const coverImages = document.querySelector('.books-list');

    coverImages.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookId = event.target.offsetParent.getAttribute('data-id');
      const indexOf = favoriteBooks.indexOf(bookId);

      if(!favoriteBooks[indexOf]){
        event.target.offsetParent.classList.add('favorite');
        if(bookId) favoriteBooks.push(bookId);
      } else{
        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.splice(indexOf, 1);
      }

      console.log(favoriteBooks);
    });


    const filterForm = document.querySelector('.filters');

    filterForm.addEventListener('click', function (event){

      const filterValue = event.target.getAttribute('value');
      const indexOf = filters.indexOf(filterValue);

      if(event.target.checked){
        filters.push(filterValue);
      } else{
        filters.splice(indexOf, 1);
      }

      console.log(filters);

      filterBooks();
    });
  };

  const filterBooks = function(){
    for(let book of books){
      let shouldBeHidden = false;

      for(let filter of filters){
        console.log(filter);
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage =  document.querySelector('.book__image[data-id="' + book.id + '"]');
      if(shouldBeHidden == true){
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }


  };




  render();
  initActions();

}