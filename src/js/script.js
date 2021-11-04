{
  'use strict';

  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);


  // eslint-disable-next-line no-undef
  const books = dataSource.books;

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

    const coverImage = document.querySelectorAll('.book__image');

    for(let image of coverImage){

      image.addEventListener('click', function(event){
        event.preventDefault();
      });

      image.addEventListener('dblclick', function(event){
        event.preventDefault();

        const bookId = image.getAttribute('data-id');
        const indexOf = favoriteBooks.indexOf(bookId);

        if(!favoriteBooks[indexOf]){

          image.classList.add('favorite');

          if(bookId) favoriteBooks.push(bookId);

        } else{
          image.classList.remove('favorite');
          favoriteBooks.splice(indexOf, 1);
        }

        console.log(favoriteBooks);
      });
    }
  };


  render();
  initActions();

}