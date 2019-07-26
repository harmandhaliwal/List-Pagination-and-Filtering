/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const listOfStudents = document.querySelectorAll('.student-item');
const itemsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = (page * itemsPerPage);

  for (let i = 0; i < list.length; i++){
     if(i >= startIndex && i < endIndex) {
        list[i].style.display = 'block'
     } else {
        list[i].style.display = 'none'
     }
  }
   };

//create element function
const createElement = (element) => {
   const tag = document.createElement(element);
   return tag;
};

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   /*
   1. Determine how many pages are needed for the list by dividing the
   total number of list items by the max number of items per page
   2. Create a div, give it the “pagination” class, and append it to the .page div
   3. Add a ul to the “pagination” div to store the pagination links
   4. for every page, add li and a tags with the page number text
   5. Add an event listener to each a tag. When they are clicked
   call the showPage function to display the appropriate page
   6. Loop over pagination links to remove active class from all links
   7. Add the active class to the link that was just clicked. You can identify that
   clicked link using event.target
   */

  const pageDiv = createElement('div');
  const pageUl = createElement('ul');
  pageDiv.className = 'pagination';
  document.querySelector(".page").appendChild(pageDiv);
  pageDiv.appendChild(pageUl);

  const pages = Math.ceil(list.length/itemsPerPage);
  for (let i = 1; i <= pages; i++) {
     const pageLi = createElement('li');
     const pageA = createElement('a');
     pageA.href = '#';
     pageA.textContent = i;
     pageUl.appendChild(pageLi);
     pageLi.appendChild(pageA);
     if (i === 1){
      pageA.className = 'active';
     }  
  };

  const a = document.querySelectorAll('.pagination ul li a');

  for (let i = 0; i < a.length; i++){
     a[i].addEventListener('click', (e) =>{
        for (let j = 0; j < a.length; j++){
           a[j].classList.remove('active');
        };
        e[i].target.classList.add('active');
        showPage(list, e.target.textContent);
      } )
  };


   };

   const studentSearch = () => {
      const headerDiv = document.querySelector('.page-header');
      let searchDiv = createElement('div');
      searchDiv.className = 'student-search';
      const searchField = createElement('input');
      searchField.setAttribute('placeholder','Search for students...');
      const searchButton = createElement('button'); 
      searchButton.textContent = 'Search';
      headerDiv.appendChild(searchDiv);
      searchDiv.appendChild(searchField);
      searchDiv.appendChild(searchButton);

   };

studentSearch();
showPage(listOfStudents, 1);
appendPageLinks(listOfStudents);



// Remember to delete the comments that came with this file, and replace them with your own code comments.