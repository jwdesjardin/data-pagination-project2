/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page) => {
   // set indexs for this page based on our page parameter
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

   // loop through and make a button for amount calculated prviously
   for (let i = 1; i <= numButtons; i++){
      const newHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', newHTML);
   }
   linkList.firstElementChild.firstElementChild.classList.add('active');

   // add event listener for click on buttons within button list
   linkList.addEventListener('click', (e) => {
      if (e.target.type === 'button'){

         //remove active class from all buttons
         const allNodes = e.target.parentElement.parentElement.childNodes;
         allNodes.forEach((node) => {
            if(node.nodeType === 1) {
               node.firstElementChild.classList.remove('active');
            }
         })

         // add active to the current button
         e.target.classList.add('active');
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
   // filter data if input value matches first or last
   const filtered = data.filter(student => {
      return student.name.first.includes(eventValue) || student.name.last.includes(eventValue);
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

//EVENT - listens for keyup on filter input and passes value of input to function
document.querySelector('#search').addEventListener('keyup', (e) => {
   filterData(e.target.value)
});

//EVENT - listens for click on filter button and passes value of input to function
document.querySelector('.student-search button').addEventListener('click', (e) => {
   filterData(e.target.parentElement.previousElementSibling.value);
});

