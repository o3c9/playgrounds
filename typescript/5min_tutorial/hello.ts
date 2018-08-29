const greeting = (person) => `Hello, ${person}`;
let user = "Jane";
let page = document.getElementById("page");
console.log(greeting(user));
page.innerHTML = greeting(user);
