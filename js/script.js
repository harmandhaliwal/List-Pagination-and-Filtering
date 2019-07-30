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
   const old = document.querySelector('.pagination');
   if (old != null) {
      document.querySelector('.page').removeChild(old);
   };
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

   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userInput = searchField.value;
      const searchResults = userSearch(userInput, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
   searchField.addEventListener('keyup', (e) => {
      const searchResults =  userSearch(e.target.value, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
};


const userSearch = (input, list) => {
   let resultArray = []; 
   if (!input) { 
      return list;
   } else {
      for (let i = 0; i < list.length; i++) { 
         list[i].style.display = 'none';
         let studentName = list[i].querySelector('h3').textContent.toLowerCase();
         if (studentName.includes(input.toLowerCase())){
               resultArray.push(list[i]);
         }
      };
      return resultArray;
   };
};


studentSearch();
showPage(listOfStudents, 1);
appendPageLinks(listOfStudents);



// Remember to delete the comments that came with this file, and replace them with your own code comments.