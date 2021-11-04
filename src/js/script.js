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

    const coverImages = document.querySelector('.books-list');


    //for(let image of coverImage){

    //image.addEventListener('click', function(event){
    //  event.preventDefault();
    //});

    coverImages.addEventListener('dblclick', function(event){
      event.preventDefault();

      //if(coverImages){
        console.log(event.target.offsetParent);
        const bookId = event.target.offsetParent.getAttribute('data-id');
        console.log(bookId);
        const indexOf = favoriteBooks.indexOf(bookId);

        if(!favoriteBooks[indexOf]){
          event.target.offsetParent.classList.add('favorite');
          if(bookId) favoriteBooks.push(bookId);

        } else{
          event.target.offsetParent.classList.remove('favorite');
          favoriteBooks.splice(indexOf, 1);
        }

      //}

      //const bookId = image.getAttribute('data-id');
      //  const indexOf = favoriteBooks.indexOf(bookId);



      console.log(favoriteBooks);
    });
    //}
  };


  render();
  initActions();

}