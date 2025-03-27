import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorMode,
  Link,
  Code,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { FaJs, FaCode, FaTerminal, FaServer, FaBug } from "react-icons/fa";
import { SiJavascript, SiTypescript } from "react-icons/si";

// Emoji/icons for sections
const sectionIcons = {
  "Introduction to JavaScript": <SiJavascript size="20px" />,
  "Variables and Data Types": "💾",
  "Operators and Expressions": "➕➖",
  "Control Flow": "🔄",
  "Functions": "🧩",
  "Arrays": "📚",
  "Objects": "🗂️",
  "DOM Manipulation": "🌐",
  "Asynchronous JavaScript": "⏳",
  "Error Handling": <FaBug size="18px" />,
  "ES6+ Features": "✨",
  "Modules and Tooling": "📦",
  "JavaScript Patterns": "🧩",
  "TypeScript Basics": <SiTypescript size="18px" />,
  "Bonus: Interview Prep": "💼",
};

const roadmapData = {
  "Introduction to JavaScript": {
    about:
      "JavaScript is a versatile programming language primarily used for web development. It runs in the browser and can also be used on the server-side with Node.js. JavaScript powers dynamic web applications, from simple form validations to complex single-page applications (SPAs).",
    subtopics: [
      {
        title: "What is JavaScript and Why Learn It?",
        content:
          "JavaScript was created in 1995 by Brendan Eich. It's the only programming language that runs natively in browsers, making it essential for web development. JavaScript is also used in server-side (Node.js), mobile apps (React Native), and desktop apps (Electron).",
        code: `// Your first JavaScript code
console.log("Hello, JavaScript!");`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction",
      },
      {
        title: "Setting Up the Development Environment",
        content:
          "Modern JavaScript development typically involves Node.js, a package manager (npm/yarn), and a code editor like VS Code. Browser developer tools are essential for debugging.",
        code: `# Install Node.js (includes npm)
# Download from https://nodejs.org

# Check installation
node -v
npm -v`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software",
      },
    ],
  },
  "Variables and Data Types": {
    about:
      "Variables in JavaScript store data that can be used and manipulated throughout your program. Data types define the kind of data a variable can hold, such as numbers, strings, or objects.",
    subtopics: [
      {
        title: "Variable Declaration: var, let, const",
        content:
          "Modern JavaScript uses `let` and `const` instead of `var`. `let` allows reassignment, `const` is for constants, and `var` is function-scoped (avoid due to hoisting issues).",
        code: `let name = 'Alice'; // Can be reassigned
name = 'Bob';

const age = 30; // Cannot be reassigned
// age = 31; // Error!

var oldWay = 'Avoid this'; // Function-scoped`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations",
      },
      {
        title: "Primitive Data Types",
        content:
          "JavaScript has seven primitive types: `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, and `symbol`. Primitives are immutable and passed by value.",
        code: `// Primitive examples
const name = 'Alice'; // string
const age = 30; // number
const isStudent = true; // boolean
const bigNumber = 12345678901234567890n; // bigint
const nothing = null; // null
const notDefined = undefined; // undefined
const id = Symbol('id'); // symbol`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
      },
      {
        title: "Complex Data Types",
        content:
          "Objects (including arrays and functions) are reference types. They can contain multiple values and are passed by reference.",
        code: `// Object
const person = {
  name: 'Alice',
  age: 30
};

// Array
const numbers = [1, 2, 3];

// Function
function greet() {
  console.log('Hello!');
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects",
      },
    ],
  },
  "Operators and Expressions": {
    about:
      "Operators in JavaScript allow you to perform operations on variables and values, such as arithmetic calculations, comparisons, and logical evaluations. Expressions combine operators and values to produce a result.",
    subtopics: [
      {
        title: "Arithmetic and Assignment Operators",
        content:
          "Basic arithmetic operators include `+`, `-`, `*`, `/`, and `%` (modulo). Assignment operators (`=`, `+=`, `-=`) assign values to variables.",
        code: `let x = 10;
let y = 3;

console.log(x + y); // 13
console.log(x - y); // 7
console.log(x * y); // 30
console.log(x / y); // 3.333...
console.log(x % y); // 1

x += 5; // x = x + 5
console.log(x); // 15`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#arithmetic_operators",
      },
      {
        title: "Comparison and Logical Operators",
        content:
          "Comparison operators (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`) compare values. Logical operators (`&&`, `||`, `!`) combine conditions.",
        code: `// Always use strict equality (===)
console.log(5 == '5'); // true (type coercion)
console.log(5 === '5'); // false

// Logical operators
const age = 25;
const isStudent = true;

if (age >= 18 && isStudent) {
  console.log('Adult student');
}

console.log(!true); // false`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#comparison_operators",
      },
      {
        title: "Typeof and Instanceof",
        content:
          "`typeof` returns a string indicating the type of a value. `instanceof` checks if an object is an instance of a constructor.",
        code: `console.log(typeof 'hello'); // 'string'
console.log(typeof 42); // 'number'
console.log(typeof true); // 'boolean'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' (arrays are objects)
console.log(typeof null); // 'object' (historical bug)
console.log(typeof undefined); // 'undefined'

const arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
      },
    ],
  },
  "Control Flow": {
    about:
      "Control flow in JavaScript determines the order in which statements are executed, using conditionals and loops to make decisions and repeat actions.",
    subtopics: [
      {
        title: "Conditional Statements",
        content:
          "`if`, `else if`, and `else` control program flow based on conditions. The `switch` statement provides an alternative for multiple conditions.",
        code: `const age = 20;

// if-else
if (age >= 21) {
  console.log('Adult');
} else if (age >= 18) {
  console.log('Young adult');
} else {
  console.log('Minor');
}

// switch
const day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('Start of work week');
    break;
  case 'Friday':
    console.log('Weekend is coming!');
    break;
  default:
    console.log('Midweek');
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#conditional_statements",
      },
      {
        title: "Loops and Iteration",
        content:
          "JavaScript provides several ways to loop: `for`, `while`, `do...while`, and `for...of`/`for...in`. Use `break` to exit loops and `continue` to skip iterations.",
        code: `// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// for...of (arrays)
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in (object properties)
const person = { name: 'Alice', age: 30 };
for (const key in person) {
  console.log(key, person[key]);
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
      },
      {
        title: "Ternary Operator",
        content:
          "The ternary operator provides a concise way to write conditional expressions.",
        code: `const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // 'Adult'

// Equivalent to:
let status;
if (age >= 18) {
  status = 'Adult';
} else {
  status = 'Minor';
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator",
      },
    ],
  },
  "Functions": {
    about:
      "Functions in JavaScript are reusable blocks of code that perform a specific task. They can take inputs (parameters) and return outputs.",
    subtopics: [
      {
        title: "Function Declarations and Expressions",
        content:
          "Functions can be declared with the `function` keyword or assigned to variables as expressions. Arrow functions provide a concise syntax.",
        code: `// Function declaration
function greet(name) {
  return 'Hello, ' + name;
}

// Function expression
const greet = function(name) {
  return 'Hello, ' + name;
};

// Arrow function
const greet = (name) => {
  return 'Hello, ' + name;
};

// Even shorter arrow function
const greet = name => 'Hello, ' + name;`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      },
      {
        title: "Parameters and Return Values",
        content:
          "Functions can accept parameters and return values. Default parameters allow you to specify fallback values.",
        code: `// Default parameters
function greet(name = 'Guest') {
  return 'Hello, ' + name;
}

console.log(greet('Alice')); // Hello, Alice
console.log(greet()); // Hello, Guest

// Returning values
function sum(a, b) {
  return a + b;
}
const result = sum(2, 3); // 5`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters",
      },
      {
        title: "Scope and Closures",
        content:
          "Variables have function scope (or block scope with `let`/`const`). Closures allow functions to remember their lexical scope.",
        code: `// Scope
function outer() {
  const outerVar = 'I am outside!';
  
  function inner() {
    const innerVar = 'I am inside!';
    console.log(outerVar); // Can access outerVar
  }
  
  // console.log(innerVar); // Error - innerVar not accessible
  inner();
}

// Closure
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
      },
    ],
  },
  "Arrays": {
    about:
      "Arrays in JavaScript are ordered lists used to store multiple values in a single variable. They come with built-in methods for manipulation.",
    subtopics: [
      {
        title: "Creating and Accessing Arrays",
        content:
          "Arrays are created with square brackets `[]` and can contain any data types. Elements are accessed by zero-based index.",
        code: `// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'two', true, { name: 'Alice' }];

// Accessing elements
console.log(fruits[0]); // 'apple'
console.log(fruits.length); // 3

// Modifying arrays
fruits[1] = 'pear';
fruits.push('grape'); // Add to end
fruits.pop(); // Remove from end`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
      {
        title: "Array Methods",
        content:
          "Arrays have many useful methods like `map()`, `filter()`, `reduce()`, `find()`, `some()`, and `every()` for transformation and querying.",
        code: `const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);

// filter - select elements
const evens = numbers.filter(n => n % 2 === 0);

// reduce - accumulate values
const sum = numbers.reduce((total, n) => total + n, 0);

// find - find first match
const firstEven = numbers.find(n => n % 2 === 0);

// some - test if any match
const hasEven = numbers.some(n => n % 2 === 0);

// every - test if all match
const allEven = numbers.every(n => n % 2 === 0);`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods",
      },
      {
        title: "Spread Operator and Destructuring",
        content:
          "The spread operator (`...`) expands arrays. Destructuring allows unpacking values from arrays into variables.",
        code: `// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Destructuring
const [first, second, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4]`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
      },
    ],
  },
  "Objects": {
    about:
      "Objects in JavaScript are collections of key-value pairs, used to store structured data and functionality.",
    subtopics: [
      {
        title: "Creating and Accessing Objects",
        content:
          "Objects are created with curly braces `{}` and contain properties (key-value pairs). Properties can be accessed with dot notation or bracket notation.",
        code: `// Creating objects
const person = {
  name: 'Alice',
  age: 30,
  'favorite color': 'blue' // Multi-word keys need quotes
};

// Accessing properties
console.log(person.name); // 'Alice'
console.log(person['age']); // 30
console.log(person['favorite color']); // 'blue'

// Adding/modifying properties
person.job = 'Developer';
person['age'] = 31;`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects",
      },
      {
        title: "Object Methods and 'this'",
        content:
          "Objects can contain functions (methods). The `this` keyword refers to the object in method context.",
        code: `const person = {
  name: 'Alice',
  greet: function() {
    console.log('Hello, ' + this.name);
  },
  // Shorthand method syntax
  greetAgain() {
    console.log('Hello again, ' + this.name);
  }
};

person.greet(); // 'Hello, Alice'

// 'this' context can be tricky
const greetFunc = person.greet;
greetFunc(); // 'Hello, undefined' (this is now global)`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
      },
      {
        title: "Object Prototypes and Classes",
        content:
          "JavaScript uses prototypal inheritance. ES6 classes provide syntactic sugar over prototypes.",
        code: `// Constructor function (old way)
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  console.log('Hello, ' + this.name);
};

// Class syntax (modern way)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log('Hello, ' + this.name);
  }
}

const alice = new Person('Alice', 30);
alice.greet(); // 'Hello, Alice'`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
      },
    ],
  },
  "DOM Manipulation": {
    about:
      "DOM manipulation in JavaScript allows you to dynamically change the content, structure, and style of a webpage by interacting with the Document Object Model (DOM).",
    subtopics: [
      {
        title: "Selecting and Modifying Elements",
        content:
          "Use methods like `querySelector()`, `getElementById()`, and `querySelectorAll()` to select DOM elements, then modify their properties.",
        code: `// Selecting elements
const header = document.querySelector('h1');
const buttons = document.querySelectorAll('.btn');

// Modifying elements
header.textContent = 'New Title';
header.style.color = 'blue';

// Adding event listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Button clicked!');
  });
});`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
      },
      {
        title: "Creating and Appending Elements",
        content:
          "You can create new elements with `document.createElement()` and add them to the DOM with methods like `appendChild()` and `insertBefore()`.",
        code: `// Creating a new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello, World!';
newDiv.className = 'box';

// Adding to the DOM
document.body.appendChild(newDiv);

// Inserting before another element
const existingElement = document.querySelector('#some-element');
document.body.insertBefore(newDiv, existingElement);`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
      },
      {
        title: "Event Bubbling and Delegation",
        content:
          "Events bubble up the DOM tree. Event delegation allows handling events on parent elements for dynamic content.",
        code: `// Event delegation example
document.querySelector('#parent').addEventListener('click', (event) => {
  if (event.target.classList.contains('child')) {
    console.log('Child element clicked:', event.target);
  }
});

// Stop propagation
document.querySelector('.btn').addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Button click won\'t bubble up');
});`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture",
      },
    ],
  },
  "Asynchronous JavaScript": {
    about:
      "Asynchronous JavaScript allows you to handle operations that take time (like fetching data) without blocking the main thread, using callbacks, promises, and async/await.",
    subtopics: [
      {
        title: "Callbacks and Promises",
        content:
          "Callbacks are functions passed to other functions to be executed later. Promises represent eventual completion (or failure) of async operations.",
        code: `// Callback example
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});

// Promise example
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data received');
      // reject('Error occurred');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
      },
      {
        title: "Async/Await",
        content:
          "Async/await provides syntactic sugar over promises, making asynchronous code look synchronous.",
        code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
      },
      {
        title: "Fetch API and AJAX",
        content:
          "The Fetch API provides an interface for fetching resources. It's a modern replacement for XMLHttpRequest (AJAX).",
        code: `// Fetch example
async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

getPosts()
  .then(posts => console.log(posts))
  .catch(error => console.error('Error:', error));`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      },
    ],
  },
  "Error Handling": {
    about:
      "Error handling in JavaScript helps you manage and recover from unexpected situations in your code gracefully.",
    subtopics: [
      {
        title: "Try/Catch/Finally",
        content:
          "The try/catch statement marks a block of code to try, and specifies a response should an exception be thrown.",
        code: `try {
  // Code that might throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Handle the error
  console.error('An error occurred:', error.message);
} finally {
  // Code that runs regardless of try/catch outcome
  console.log('Operation attempted');
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
      },
      {
        title: "Custom Errors",
        content:
          "You can create custom error types by extending the Error class for more specific error handling.",
        code: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateInput(input) {
  if (!input) {
    throw new ValidationError('Input cannot be empty');
  }
}

try {
  validateInput('');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
      },
      {
        title: "Error Handling in Async Code",
        content:
          "Async functions can use try/catch, while promises use .catch() for error handling.",
        code: `// Async/await error handling
async function fetchData() {
  try {
    const response = await fetch('invalid-url');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw if needed
  }
}

// Promise error handling
fetch('invalid-url')
  .then(response => response.json())
  .catch(error => console.error('Fetch error:', error));`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
      },
    ],
  },
  "ES6+ Features": {
    about:
      "ECMAScript 2015 (ES6) and later versions introduced many new features that modernize JavaScript development.",
    subtopics: [
      {
        title: "Let/Const and Block Scoping",
        content:
          "`let` and `const` provide block scoping, preventing issues with `var`'s function scoping. `const` prevents reassignment.",
        code: `// Block scoping
{
  let x = 1;
  const y = 2;
  // y = 3; // Error
}
// console.log(x); // Error - x not defined

// var is function scoped
function example() {
  if (true) {
    var z = 10;
  }
  console.log(z); // 10 (var is accessible)
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
      },
      {
        title: "Template Literals",
        content:
          "Template literals allow embedded expressions and multi-line strings using backticks (`).",
        code: `const name = 'Alice';
const age = 30;

// String interpolation
console.log(\`Hello, \${name}! You are \${age} years old.\`);

// Multi-line strings
const message = \`
  This is a
  multi-line
  string.
\`;`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
      },
      {
        title: "Destructuring and Spread/Rest",
        content:
          "Destructuring unpacks values from arrays/objects. Spread expands iterables, while rest collects remaining elements.",
        code: `// Object destructuring
const person = { name: 'Alice', age: 30 };
const { name, age } = person;

// Array destructuring
const numbers = [1, 2, 3];
const [first, ...rest] = numbers;

// Spread operator
const newNumbers = [...numbers, 4, 5];

// Rest parameters
function sum(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
      },
    ],
  },
  "Modules and Tooling": {
    about:
      "JavaScript modules allow you to split code into separate files. Modern tooling helps with bundling, transpiling, and more.",
    subtopics: [
      {
        title: "ES Modules",
        content:
          "ES modules (import/export) are the standard way to organize JavaScript code into reusable modules.",
        code: `// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

// app.js
import { add, PI } from './math.js';

console.log(add(2, 3)); // 5
console.log(PI); // 3.14159`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
      },
      {
        title: "CommonJS and Node.js Modules",
        content:
          "Node.js traditionally used CommonJS modules (require/module.exports), though ES modules are now supported.",
        code: `// math.js
function add(a, b) {
  return a + b;
}

module.exports = {
  add,
  PI: 3.14159
};

// app.js
const math = require('./math.js');

console.log(math.add(2, 3)); // 5
console.log(math.PI); // 3.14159`,
        mdnLink: "https://nodejs.org/api/modules.html",
      },
      {
        title: "Bundlers (Webpack, Vite)",
        content:
          "Bundlers like Webpack and Vite combine modules and assets for production deployment.",
        code: `# Example Webpack config (webpack.config.js)
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};`,
        mdnLink: "https://webpack.js.org/concepts/",
      },
    ],
  },
  "JavaScript Patterns": {
    about:
      "Design patterns are reusable solutions to common problems in software design. JavaScript has several patterns for organizing code.",
    subtopics: [
      {
        title: "Module Pattern",
        content:
          "The module pattern uses closures to create private and public encapsulation.",
        code: `const counterModule = (function() {
  let count = 0; // private
  
  return {
    increment: function() {
      count++;
    },
    getCount: function() {
      return count;
    }
  };
})();

counterModule.increment();
console.log(counterModule.getCount()); // 1
// console.log(counterModule.count); // undefined`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#emulating_private_methods_with_closures",
      },
      {
        title: "Factory Functions",
        content:
          "Factory functions return new objects without using the `new` keyword.",
        code: `function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(\`Hello, \${this.name}\`);
    }
  };
}

const alice = createPerson('Alice', 30);
alice.greet();`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer",
      },
      {
        title: "Singleton Pattern",
        content:
          "The singleton pattern ensures a class has only one instance and provides a global point of access to it.",
        code: `const Singleton = (function() {
  let instance;
  
  function createInstance() {
    const object = new Object('I am the instance');
    return object;
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
      },
    ],
  },
  "TypeScript Basics": {
    about:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.",
    subtopics: [
      {
        title: "Basic Types",
        content:
          "TypeScript provides basic types like `number`, `string`, `boolean`, `array`, `tuple`, `enum`, `any`, and more.",
        code: `let isDone: boolean = false;
let count: number = 10;
let name: string = 'Alice';

let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10]; // Fixed-length array

enum Color { Red, Green, Blue }
let c: Color = Color.Green;`,
        mdnLink: "https://www.typescriptlang.org/docs/handbook/basic-types.html",
      },
      {
        title: "Interfaces and Types",
        content:
          "Interfaces define contracts for object shapes. Type aliases can name any type.",
        code: `interface Person {
  name: string;
  age: number;
  greet(): void;
}

type Point = {
  x: number;
  y: number;
};

function printPerson(person: Person) {
  console.log(\`\${person.name} is \${person.age}\`);
}`,
        mdnLink: "https://www.typescriptlang.org/docs/handbook/interfaces.html",
      },
      {
        title: "Generics",
        content:
          "Generics provide a way to create reusable components that work with multiple types.",
        code: `function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('hello');
let output2 = identity<number>(42);

interface GenericArray<T> {
  [index: number]: T;
}

let myArray: GenericArray<number> = [1, 2, 3];`,
        mdnLink: "https://www.typescriptlang.org/docs/handbook/generics.html",
      },
    ],
  },
  "Bonus: Interview Prep": {
    about:
      "Preparing for JavaScript interviews involves understanding core concepts, common patterns, and practicing coding challenges.",
    subtopics: [
      {
        title: "Common Interview Questions",
        content:
          "Be prepared to explain: Event loop, hoisting, closures, prototypal inheritance, 'this' context, promises vs callbacks, and ES6+ features.",
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        title: "Coding Challenges",
        content:
          "Practice problems like: Implementing debounce/throttle, deep object comparison, array flattening, memoization, and promise polyfills.",
        code: `// Example: Implement Array.prototype.map
function customMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

const numbers = [1, 2, 3];
const doubled = customMap(numbers, n => n * 2);
console.log(doubled); // [2, 4, 6]`,
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
      },
      {
        title: "System Design Concepts",
        content:
          "For senior roles, understand: Event-driven architecture, pub/sub patterns, WebSockets, REST vs GraphQL, and performance optimization.",
        mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      },
    ],
  },
};

const JavaScriptRoadmap = () => {
  const { colorMode } = useColorMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <Box
      minHeight="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      color={colorMode === "light" ? "gray.800" : "white"}
      p={{ base: 4, md: 8 }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        {/* Main Content */}
        <Box flex="1">
          {/* Header */}
          <Flex align="center" gap={3} mb={6}>
            <FaJs size="32px" color="#F7DF1E" />
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              JavaScript Roadmap
            </Text>
          </Flex>

          {/* Sections */}
          {selectedSection ? (
            <Box>
              <Flex align="center" gap={3} mb={4}>
                <Box fontSize="2xl">
                  {sectionIcons[selectedSection]}
                </Box>
                <Text fontSize="2xl" fontWeight="semibold">
                  {selectedSection}
                </Text>
              </Flex>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.400"}
                mb={6}
              >
                {roadmapData[selectedSection].about}
              </Text>
              
              <VStack align="start" spacing={8}>
                {roadmapData[selectedSection].subtopics.map((subtopic, subIdx) => (
                  <Box key={subIdx} width="100%">
                    <Flex align="center" gap={2} mb={3}>
                      <Box
                        width="10px"
                        height="10px"
                        borderRadius="full"
                        bg="blue.400"
                      />
                      <Text fontSize="lg" fontWeight="medium">
                        {subtopic.title}
                      </Text>
                    </Flex>
                    <Text
                      fontSize="md"
                      color={colorMode === "light" ? "gray.600" : "gray.400"}
                      pl={6}
                      mb={4}
                    >
                      {subtopic.content}
                    </Text>
                    
                    {subtopic.code && (
                      <Box 
                        mb={4} 
                        pl={6}
                        width="100%"
                        overflowX="auto"
                        bg={colorMode === "light" ? "gray.100" : "gray.800"}
                        p={4}
                        borderRadius="md"
                      >
                        <Code 
                          display="block" 
                          whiteSpace="pre" 
                          colorScheme="blue"
                          children={subtopic.code}
                        />
                      </Box>
                    )}
                    
                    {subtopic.mdnLink && (
                      <Link
                        href={subtopic.mdnLink}
                        isExternal
                        fontSize="sm"
                        color="blue.500"
                        pl={6}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Learn more →
                      </Link>
                    )}
                    
                    {subIdx < roadmapData[selectedSection].subtopics.length - 1 && (
                      <Divider my={6} borderColor={colorMode === "light" ? "gray.200" : "gray.700"} />
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          ) : (
            <VStack spacing={4} textAlign="center" mt={10}>
              <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.400"}>
                Select a section from the sidebar to start learning JavaScript!
              </Text>
              <Badge colorScheme="blue" fontSize="lg" p={2}>
                Pro Tip: Follow the roadmap in order for best learning experience
              </Badge>
            </VStack>
          )}
        </Box>

        {/* Sidebar */}
        <Box
          as={motion.div}
          initial={{ width: "240px" }}
          animate={{ width: isSidebarOpen ? "240px" : "0" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          bg={colorMode === "light" ? "white" : "gray.800"}
          p={4}
          height="100vh"
          position={{ base: "fixed", md: "sticky" }}
          top="0"
          right="0"
          overflowY="auto"
          overflowX="hidden"
          zIndex="10"
          boxShadow="md"
          display={{ base: isSidebarOpen ? "block" : "none", md: "block" }}
        >
          <Text fontSize="lg" fontWeight="bold" mb={4} pl={2}>
            JavaScript Topics
          </Text>
          <VStack align="start" spacing={3}>
            {Object.keys(roadmapData).map((section, idx) => (
              <Box
                key={idx}
                width="100%"
                p={2}
                borderRadius="md"
                _hover={{
                  bg: colorMode === "light" ? "gray.100" : "gray.700",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedSection(section)}
                bg={
                  selectedSection === section
                    ? colorMode === "light"
                      ? "blue.50"
                      : "blue.900"
                    : "transparent"
                }
                borderLeft={
                  selectedSection === section
                    ? "4px solid"
                    : "4px solid transparent"
                }
                borderColor="blue.400"
              >
                <Flex align="center" gap={3}>
                  <Box fontSize="lg">{sectionIcons[section]}</Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={
                      colorMode === "light" ? "gray.700" : "gray.300"
                    }
                  >
                    {section}
                  </Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Sidebar Toggle Button (Mobile) */}
        <IconButton
          icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="ghost"
          size="md"
          aria-label="Toggle Sidebar"
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex="20"
          colorScheme="blue"
          display={{ base: "block", md: "none" }}
        />
      </Flex>
    </Box>
  );
};

export default JavaScriptRoadmap;