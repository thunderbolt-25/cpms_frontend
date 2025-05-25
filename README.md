# CPMS(College ERP)

[kollege.onrender.com](https://kollege.onrender.com)

A College Based Data Management System.

- There are two types of roles: Faculty[Teacher,HOD] and Student.

## Login Details

PS: BE KIND :)

### Teacher [staff]

**username:** FacultyAditya  
**pwd:** hello

Teacher can add or edit

- Notes
- Attendance
- Internal Marks
- Time Schedule

### HOD (Head of Department) [staff]

**username:** admin[Dept.]  
**pwd:** hello

HOD can do everything Teacher can.  
HOD can also

- Approve new Teacher
- Add New Paper

### Student

**username:** 2125cs1059  
**pwd:** hello

Or register a new Student and Login.  
You can also login with the First Name of any student in the class.

Student can view

- Notes
- Attendance
- Internal Marks

Attendance and Marks needs to be added by the teacher first.  
Student can also join or leave a Paper(Subject).

## Tech Stack

**Client:** React, TailwindCSS

**Server:** NodeJS, ExpressJS

**Database:** MongoDB, Mongoose

## Other Features

- Profile
- Dark Theme
- Mobile Responsive

## Setting Up

Clone the project:

```bash
  git clone https://github.com/thunderbolt-25/cpms_frontend.git
```

Change Directory:

```bash
  cd kollege
```

Install dependencies:

```bash
  npm install
```

Finally,

```bash
  npm start
```

### Using your own server and database

The requests are send to the hosted server by default.  
if you want to use your own server and database, follow the steps [here](https://github.com/thunderbolt-25/cpms_backend#readme) to step up one.

Then, go to src/config/api/axios.js. change the baseURL to your backend address:

```javascript
baseURL: "http://localhost:3500";
```

```javascript
baseURL: "https://example.address.com";
```


## Acknowledgements

- [React Router](https://reactrouter.com/en/main)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [axios](https://axios-http.com/)
- [README Editor](readme.so)

## Related

[cpms_backend](https://github.com/thunderbolt-25/cpms_backend)

