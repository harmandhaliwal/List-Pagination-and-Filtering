/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing




const listOfStudents = document.querySelectorAll('.student-item'); //stores student list item elements as a NodeList object
const itemsPerPage = 10;

//hides all the students except for the ten you want displayed on a given page.
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

//creates and appends functioning pagination links
const appendPageLinks = (list) => {
   //removes previous page links so there in no build up when new input is entered in search bar
   const previousPl = document.querySelector('.pagination');
   if (previousPl != null) {
      document.querySelector('.page').removeChild(previousPl);
   };
  const pageDiv = createElement('div');
  const pageUl = createElement('ul');
  pageDiv.className = 'pagination';
  document.querySelector(".page").appendChild(pageDiv);
  pageDiv.appendChild(pageUl);
//if user input value does not include any student names then "No Results" text will be displayed in HTML*
  if (list.length === 0) { 
   const span = document.createElement('span');
   span.textContent = 'No Results';
   pageDiv.appendChild(span);
}

  const pages = Math.ceil(list.length/itemsPerPage); //calculates how many pages are needed
  for (let i = 1; i <= pages; i++) { //iterates for as many pages there are to create the correct amount of li elements
     const pageLi = createElement('li');
     const pageA = createElement('a');
     pageA.href = '#';
     pageA.textContent = i; //text is set to the page number
     pageUl.appendChild(pageLi);
     pageLi.appendChild(pageA);
     if (i === 1){ //sets 'active' class name to the first pagination link initially
      pageA.className = 'active'; //'active' class name changes css design of 'a' element when its hovered over or clicked
     }  
  };

  const a = document.querySelectorAll('.pagination ul li a');
  for (let i = 0; i < a.length; i++){ //event listener added to each 'a' element 
     a[i].addEventListener('click', (e) =>{
        for (let j = 0; j < a.length; j++){ //removes 'active' class from all page links when 'a' element is clicked
           a[j].classList.remove('active');
        };
        e.target.classList.add('active'); //adds 'active' class to the target (clicked) 'a' element
        showPage(list, e.target.textContent); //e.target.textContent is used to get the student list of the clicked page when calling the showPage function
      } )
  };
   };

/*
   The function below creates and appends a search bar.
   When the search button is clicked, the list is filtered by student name for those that include the search value.
   A keyup event listener is also added to the search input so that the list filters in real time as the user types. 
*/
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
//click event listener
   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userInput = searchField.value;
      const searchResults = userSearch(userInput, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
//keyup event listener
   searchField.addEventListener('keyup', (e) => {
      const searchResults =  userSearch(e.target.value, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
};

//returns array of the search results in
const userSearch = (input, list) => {
   let resultArray = []; 
   if (!input) { 
      return list; //if input field is empty then paginated list of students is returned
   } else {
      for (let i = 0; i < list.length; i++) { 
         list[i].style.display = 'none';
         let studentName = list[i].querySelector('h3').textContent.toLowerCase(); //stores student names in lower case by calling h3 element
         //if student name includes a value from the user's input then it is pushed into the array
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

