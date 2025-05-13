function time_now(){
    // Get the current date and time
    let currentdate = new Date();
    // Get the current time
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
    // calculate AM or PM
    let ampm = hours >= 12 ? 'PM' : 'AM';
    // convert hours to 12-hour format
    hours = hours % 12 || 12; // if hours % 12 is 0, return 12, else return hours % 12
    // Get date
    let month = currentdate.getMonth(); // getMonth() returns 0-11
    let day_date = currentdate.getDate();
    let year = currentdate.getFullYear();
    // get day (Monday, Tuesday, etc.)
    let day_of_week = currentdate.getDay();
    // Convert day to string (Sunday, Monday, etc.)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day_of_week = days[day_of_week];

    // Convert month to string (January, February, etc.)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = months[month];
    // Display the time
    let time_display = `Today is ${month} ${day_date}, ${year}, ${day_of_week}. <br> The current time is ${hours}:${minutes} ${ampm}.`; 
    document.getElementById('time').innerHTML = time_display;
}

// Student Object using function constructor
function Student(name, age, email, course){
    this.student_number = student_num_generator();
    this.name = name;
    this.age = age;
    this.email = email;
    this.course = course;
    this.output = function(){
        return `Student Number: ${this.student_number} 
        Name: ${this.name} 
        Age: ${this.age} 
        Email: ${this.email} 
        Course: ${this.course}`;
    }
}

function student_num_generator(){
    // generate student number starting with 2023 + 5 random numbers
    let student_num = '2023';
    for(let i = 0; i < 5; i++){
        student_num += Math.floor(Math.random() * 10); // *10 to get 0-9
    }
    // check if student number already exists, if so, run the function again
    if(student_numbers.includes(student_num)){
        student_num_generator();
    }
    // if not yet generated, add to array, then return to Student object
    student_numbers.push(student_num);
    return student_num;
}

// array of generated student numbers
let student_numbers = [];
// array of students
let student_list = [];

// // CHECKERS (dummy students)
const student1 = new Student("Joe Mama", 20, "joe@up.edu.ph", "BA Applied Poetry of the Future");
const student2 = new Student("Jane Doe", 21, "jane@up.edu.ph", "BA Food Appreciation");
// add students to array
student_list[0] = student1; 
student_list[1] = student2;
console.log(student_list);





// add student button function
function add_student(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('age-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('course-error').textContent = '';

    // Perform validation
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;

    let isValid = true;

    if (!name || !name.includes(' ')) {
        document.getElementById('name-error').textContent = 'Please enter a full name (first and last name).';
        isValid = false;
    }

    if (!age || isNaN(age) || age <= 18 || age >= 99) {
        document.getElementById('age-error').textContent = 'Please enter a valid age.';
        isValid = false;
    }

    if (!email || !email.endsWith('@up.edu.ph')) {
        document.getElementById('email-error').textContent = 'Please use a valid UP Mail address.';
        isValid = false;
    }

    if (!course) {
        document.getElementById('course-error').textContent = 'Please select a course.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // If validation passes, add the student
    const student = new Student(name, age, email, course);
    student_list.push(student);
    // confirmation alert
    alert(`The following student has been added: \n ${student.output()}`);
    // document.getElementById('confirmation').innerHTML = `The following student has been added: <br> ${student.output()}`; // Display student info
    console.log(student_list);
}



// search student button function
function search_student(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('search-error').textContent = '';
    document.getElementById('search_result').textContent = '';

    // Perform validation
    const search = document.getElementById('search').value.trim();
    let isValid = true;

    if (!search) {
        document.getElementById('search-error').textContent = 'Please enter a student number.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // If validation passes, search for the student
    let found = false;
    for (let i = 0; i < student_list.length; i++) {
        if (student_list[i].student_number === search) {
            const table = document.getElementById('search_result');
            table.innerHTML = `
                <p>Student Found:</p>
                <table>
                    <tr>
                        <th>Student Number</th>
                        <td>${student_list[i].student_number}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>${student_list[i].name}</td>
                    </tr>
                    <tr>
                        <th>Age</th>
                        <td>${student_list[i].age}</td>
                    </tr>
                    <tr>
                        <th>UP Mail</th>
                        <td>${student_list[i].email}</td>
                    </tr>
                    <tr>
                        <th>Course</th>
                        <td>${student_list[i].course}</td>
                    </tr>
                </table>
            `;
            found = true;
            break;
        }
    }

    if (!found) {
        document.getElementById('search_result').innerHTML = 'Student not found.';
    }
}

// display all students function
function display_students() {
    // Get the table element
    const table = document.getElementById('students_table');

    // Make the table visible
    table.style.display = 'table';

    // Clear any existing rows except the header
    table.innerHTML = `
        <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>UP Mail</th>
            <th>Course</th>
        </tr>
    `;

    // Check if there are students in the list
    if (student_list.length === 0) {
        const row = table.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = 'No students to display.';
        cell.style.textAlign = 'center';
        return;
    }


    
    // Loop through the student_list and add rows to the table
    for (let i = 0; i < student_list.length; i++) {
        const row = table.insertRow();
        row.insertCell(0).textContent = student_list[i].student_number; // use dot notation to access object properties
        row.insertCell(1).textContent = student_list[i].name;
        row.insertCell(2).textContent = student_list[i].age;
        row.insertCell(3).textContent = student_list[i].email;
        row.insertCell(4).textContent = student_list[i].course;
    }
}

