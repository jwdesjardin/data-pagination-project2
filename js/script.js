/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   // set indexes for this page based on our page parameter
   const startIndex = (page * 9) - 9;
   const endIndex = (page * 9);

   // grab student list and clear any exsisting students
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // loop through each student
   list.forEach((student, i) => {
      // check if index is within our constraints
      if(i >= startIndex && i < endIndex){
         // create newHTML using the student object
         const newHTML = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>
         `;
         // insert newHTML at the end of studentList
         studentList.insertAdjacentHTML('beforeend', newHTML);
      }
   });
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list) => {
   // calculate number of buttons
   const numButtons = Math.ceil(list.length / 9);

   // grab ul and clear any results that may be there
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   // loop through and make the number of buttons calculated previously
   for (let i = 1; i <= numButtons; i++){
      const newHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', newHTML);
   }
   //make first button active
   linkList.firstElementChild.firstElementChild.classList.add('active');

   // add event listener for click on buttons within button list
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON'){
         // traverse dom and set connection points
         const button = e.target;
         const li = button.parentElement;
         const ul = li.parentElement;

         // search ul and get all elements with active class
         const children = ul.getElementsByClassName('active');

         //loop through buttons and remove active class
         for (let i = 0; i < children.length; i++)
         children[i].classList.remove('active');
         
         // add active to the current button
         button.classList.add('active');
         
         //refresh page
         showPage(list, e.target.textContent);
      }
   })
}


// Calls functions when page loads
showPage(data, 1);
addPagination(data);

//Extra Credit
//add search bar in header
const searchBar = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
document.querySelector('header').insertAdjacentHTML('beforeend', searchBar);

//searchbar functionality
const filterData = (eventValue) => {

   //handle case sensitive search 
   const text = eventValue.toLowerCase().trim();
   
   // filter data if input value matches first or last
   const filtered = data.filter(student => {
      // search if text can be found in the student's name
      const name = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
      return name.includes(text);
   });

   // refresh page with filtered results if they exist
   if (filtered.length > 0) {
      showPage(filtered, 1);
      addPagination(filtered);

      //if no results exist
   } else {
      //clear the page and pagination buttons
      document.querySelector('.student-list').innerHTML = '';
      document.querySelector('.link-list').innerHTML = '';
      // set the value of the student-list to the error message
      const err = `No Results Found`;
      document.querySelector('.student-list').textContent = err;
   }
   
}

//EVENT - listens for keyup on FILTER INPUT and passes value of input to function
document.querySelector('#search').addEventListener('keyup', (e) => {
   filterData(e.target.value)
});

//EVENT - listens for click on FILTER BUTTON and passes value of input to function
document.querySelector('.student-search button').addEventListener('click', (e) => {
   filterData(e.target.parentElement.previousElementSibling.value);
});

