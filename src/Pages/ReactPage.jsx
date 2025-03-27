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
import { FaReact, FaCode, FaJs, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiRedux, SiNextdotjs, SiTypescript } from "react-icons/si";

// Emoji/icons for sections
const sectionIcons = {
  "Introduction to React": <FaReact />,
  "JSX Fundamentals": <FaCode />,
  "Components and Props": <FaJs />,
  "State and Lifecycle": "🔄",
  "Hooks in Depth": "🎣",
  "Styling in React": <FaCss3Alt />,
  "Forms and Events": "📝",
  "Routing with React Router": "🛣️",
  "State Management": <SiRedux />,
  "Performance Optimization": "⚡",
  "Server-Side Rendering": <SiNextdotjs />,
  "Testing React Apps": "🧪",
  "TypeScript with React": <SiTypescript />,
  "React Ecosystem": "🌐",
  "Bonus: React Interview Prep": "💼",
};

const roadmapData = {
  "Introduction to React": {
    about:
      "React is a JavaScript library for building user interfaces. It lets you create reusable UI components and efficiently update the DOM when your data changes. React follows a component-based architecture and uses a virtual DOM for performance.",
    subtopics: [
      {
        title: "What is React and Why Use It?",
        content:
          "React was created by Facebook in 2013. It's used for building single-page applications (SPAs) and complex UIs. Key advantages include component reusability, virtual DOM for performance, and a rich ecosystem.",
        code: `// Example: Simple React Component
function Welcome() {
  return <h1>Hello, React!</h1>;
}`,
        mdnLink: "https://reactjs.org/docs/getting-started.html",
      },
      {
        title: "Setting Up a React Environment",
        content:
          "You can set up React using Create React App (CRA), Vite, or Next.js. CRA is the simplest way to start with zero configuration.",
        code: `# Using Create React App
npx create-react-app my-app
cd my-app
npm start`,
        mdnLink: "https://create-react-app.dev/",
      },
    ],
  },
  "JSX Fundamentals": {
    about:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets compiled to React.createElement() calls.",
    subtopics: [
      {
        title: "JSX Syntax and Rules",
        content:
          "JSX looks like HTML but has some key differences: use className instead of class, camelCase for attributes, and must have a single root element.",
        code: `// Valid JSX
const element = (
  <div className="container">
    <h1>Hello World</h1>
    <p>This is JSX!</p>
  </div>
);`,
        mdnLink: "https://reactjs.org/docs/introducing-jsx.html",
      },
      {
        title: "Embedding Expressions in JSX",
        content:
          "You can embed any JavaScript expression in JSX by wrapping it in curly braces {}.",
        code: `function Greeting() {
  const name = 'Alice';
  return <h1>Hello, {name}!</h1>;
}`,
        mdnLink: "https://reactjs.org/docs/jsx-in-depth.html",
      },
    ],
  },
  "Components and Props": {
    about:
      "Components let you split the UI into independent, reusable pieces. Props (properties) are how components talk to each other by passing data from parent to child.",
    subtopics: [
      {
        title: "Function and Class Components",
        content:
          "Components can be defined as functions (preferred) or classes. Function components are simpler and with hooks can do everything class components can.",
        code: `// Function Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
        mdnLink: "https://reactjs.org/docs/components-and-props.html",
      },
      {
        title: "Props and PropTypes",
        content:
          "Props are read-only inputs to components. PropTypes can be used to document the expected types of props.",
        code: `import PropTypes from 'prop-types';

function User({ name, age }) {
  return <div>{name} is {age} years old</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};`,
        mdnLink: "https://reactjs.org/docs/typechecking-with-proptypes.html",
      },
    ],
  },
  "State and Lifecycle": {
    about:
      "State allows components to manage data that changes over time. Lifecycle methods let you run code at specific points in a component's lifetime.",
    subtopics: [
      {
        title: "Understanding State",
        content:
          "State is data that changes over time and affects what renders on the screen. In class components, state is managed with this.state and this.setState().",
        code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}`,
        mdnLink: "https://reactjs.org/docs/state-and-lifecycle.html",
      },
      {
        title: "Component Lifecycle Methods",
        content:
          "Class components have lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount for side effects.",
        code: `class Example extends React.Component {
  componentDidMount() {
    console.log('Component mounted');
    // Good for API calls, subscriptions
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      console.log('ID changed');
    }
  }
  
  componentWillUnmount() {
    console.log('Component will unmount');
    // Clean up subscriptions
  }
}`,
        mdnLink: "https://reactjs.org/docs/react-component.html",
      },
    ],
  },
  "Hooks in Depth": {
    about:
      "Hooks are functions that let you use state and other React features in function components. They were introduced in React 16.8.",
    subtopics: [
      {
        title: "useState and useEffect",
        content:
          "useState lets you add state to function components. useEffect lets you perform side effects like data fetching.",
        code: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // Only re-run if count changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
        mdnLink: "https://reactjs.org/docs/hooks-intro.html",
      },
      {
        title: "useContext, useReducer, and Custom Hooks",
        content:
          "useContext provides a way to pass data through the component tree without prop drilling. useReducer is for more complex state logic.",
        code: `// Context example
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div style={{ background: theme === 'dark' ? '#333' : '#FFF' }} />;
}`,
        mdnLink: "https://reactjs.org/docs/hooks-reference.html",
      },
    ],
  },
  "Styling in React": {
    about:
      "There are multiple ways to style React components: CSS, CSS-in-JS, CSS Modules, utility-first CSS frameworks, and more.",
    subtopics: [
      {
        title: "CSS and CSS Modules",
        content:
          "Regular CSS files can be imported directly. CSS Modules provide locally scoped CSS to prevent naming conflicts.",
        code: `/* styles.module.css */
.button {
  background: blue;
  color: white;
}

// Component using CSS Module
import styles from './styles.module.css';

function Button() {
  return <button className={styles.button}>Click Me</button>;
}`,
        mdnLink: "https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/",
      },
      {
        title: "Styled Components and Emotion",
        content:
          "CSS-in-JS libraries like styled-components let you write CSS directly in your JavaScript files with full component scoping.",
        code: `import styled from 'styled-components';

const StyledButton = styled.button\`
  background: \${props => props.primary ? 'blue' : 'white'};
  color: \${props => props.primary ? 'white' : 'black'};
  padding: 0.5rem 1rem;
\`;

function App() {
  return (
    <div>
      <StyledButton>Normal</StyledButton>
      <StyledButton primary>Primary</StyledButton>
    </div>
  );
}`,
        mdnLink: "https://styled-components.com/docs",
      },
    ],
  },
  "Forms and Events": {
    about:
      "Handling forms and events in React is slightly different from regular HTML due to React's synthetic event system.",
    subtopics: [
      {
        title: "Controlled Components",
        content:
          "In React, form elements like <input> should be controlled components where React controls the value and changes.",
        code: `function Form() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted: ' + value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        mdnLink: "https://reactjs.org/docs/forms.html",
      },
      {
        title: "Form Validation",
        content:
          "You can implement form validation by checking values in state and showing error messages conditionally.",
        code: `function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
        mdnLink: "https://reactjs.org/docs/forms.html#validation",
      },
    ],
  },
  "Routing with React Router": {
    about:
      "React Router is the standard routing library for React. It enables navigation between views in a React application.",
    subtopics: [
      {
        title: "Basic Routing",
        content:
          "React Router uses <BrowserRouter>, <Route>, and <Link> components to handle routing in your app.",
        code: `import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        mdnLink: "https://reactrouter.com/docs/en/v6/getting-started/tutorial",
      },
      {
        title: "Dynamic Routing and Nested Routes",
        content:
          "You can create dynamic routes with parameters and nest routes for more complex UIs.",
        code: `function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />}>
          <Route path=":userId" element={<UserProfile />} />
          <Route path="me" element={<OwnProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Access params with useParams hook
function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}`,
        mdnLink: "https://reactrouter.com/docs/en/v6/getting-started/overview",
      },
    ],
  },
  "State Management": {
    about:
      "For complex applications, you might need state management solutions beyond React's built-in state.",
    subtopics: [
      {
        title: "Context API",
        content:
          "React's Context API provides a way to share values between components without explicitly passing props.",
        code: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}`,
        mdnLink: "https://reactjs.org/docs/context.html",
      },
      {
        title: "Redux Toolkit",
        content:
          "Redux is a predictable state container. Redux Toolkit simplifies Redux setup with best practices built-in.",
        code: `// store.js
import { configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
  },
});

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Component
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}`,
        mdnLink: "https://redux-toolkit.js.org/",
      },
    ],
  },
  "Performance Optimization": {
    about:
      "React is fast by default, but there are techniques to optimize performance for complex applications.",
    subtopics: [
      {
        title: "React.memo and useMemo",
        content:
          "React.memo memoizes components to prevent unnecessary re-renders. useMemo memoizes expensive calculations.",
        code: `const ExpensiveComponent = React.memo(function MyComponent({ value }) {
  // Only re-renders if props change
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <ExpensiveComponent value={expensiveValue} />
    </div>
  );
}`,
        mdnLink: "https://reactjs.org/docs/react-api.html#reactmemo",
      },
      {
        title: "Code Splitting and Lazy Loading",
        content:
          "Code splitting lets you load only the necessary code for the current view, improving initial load time.",
        code: `import { lazy, Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}`,
        mdnLink: "https://reactjs.org/docs/code-splitting.html",
      },
    ],
  },
  "Server-Side Rendering": {
    about:
      "Server-side rendering (SSR) improves SEO and performance by rendering React components on the server.",
    subtopics: [
      {
        title: "Next.js Basics",
        content:
          "Next.js is a popular React framework that supports SSR out of the box with file-based routing.",
        code: `// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}`,
        mdnLink: "https://nextjs.org/docs",
      },
      {
        title: "Data Fetching in Next.js",
        content:
          "Next.js provides getServerSideProps and getStaticProps for server-side data fetching.",
        code: `export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }, // will be passed to the page component
  };
}

function Page({ data }) {
  return <div>{data.message}</div>;
}`,
        mdnLink: "https://nextjs.org/docs/basic-features/data-fetching",
      },
    ],
  },
  "Testing React Apps": {
    about:
      "Testing ensures your React components work as expected. Common tools include Jest and React Testing Library.",
    subtopics: [
      {
        title: "Unit Testing with Jest",
        content:
          "Jest is a JavaScript testing framework that works well with React. It provides test runners, assertions, and mocking.",
        code: `// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});`,
        mdnLink: "https://jestjs.io/docs/getting-started",
      },
      {
        title: "Component Testing with React Testing Library",
        content:
          "React Testing Library helps you test components in a way that resembles how users interact with your app.",
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('button click calls onClick handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  fireEvent.click(screen.getByText('Click Me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});`,
        mdnLink: "https://testing-library.com/docs/react-testing-library/intro/",
      },
    ],
  },
  "TypeScript with React": {
    about:
      "TypeScript adds static typing to JavaScript, catching errors during development and improving code quality.",
    subtopics: [
      {
        title: "Typing Props and State",
        content:
          "TypeScript can type-check your component props and state to prevent common errors.",
        code: `interface UserProps {
  name: string;
  age?: number; // Optional
}

function User({ name, age = 18 }: UserProps) {
  return (
    <div>
      {name} is {age} years old
    </div>
  );
}`,
        mdnLink: "https://www.typescriptlang.org/docs/handbook/react.html",
      },
      {
        title: "Typing Hooks and Events",
        content:
          "TypeScript can also type React hooks and event handlers for better type safety.",
        code: `function Counter() {
  const [count, setCount] = useState<number>(0);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount(prev => prev + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}`,
        mdnLink: "https://react-typescript-cheatsheet.netlify.app/",
      },
    ],
  },
  "React Ecosystem": {
    about:
      "The React ecosystem includes many libraries and tools that complement React for building full applications.",
    subtopics: [
      {
        title: "Popular React Libraries",
        content:
          "React has a rich ecosystem including libraries for forms (Formik), animations (Framer Motion), charts (Recharts), and more.",
        code: `// Example with Formik
import { Formik, Form, Field } from 'formik';

function SignupForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="email" type="email" />
        <Field name="password" type="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}`,
        mdnLink: "https://reactjs.org/community/third-party.html",
      },
      {
        title: "React and Backend Integration",
        content:
          "React apps typically communicate with backends via REST APIs or GraphQL (with Apollo Client or Relay).",
        code: `// Example with Apollo Client
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

client.query({
  query: gql\`
    query GetBooks {
      books {
        title
        author
      }
    }
  \`
}).then(result => console.log(result));`,
        mdnLink: "https://www.apollographql.com/docs/react/",
      },
    ],
  },
  "Bonus: React Interview Prep": {
    about:
      "Preparing for React interviews involves understanding core concepts, common patterns, and practicing coding challenges.",
    subtopics: [
      {
        title: "Common React Interview Questions",
        content:
          "Be prepared to explain: Virtual DOM, component lifecycle, hooks rules, controlled vs uncontrolled components, React Fiber, and reconciliation.",
        mdnLink: "https://reactjs.org/docs/faq.html",
      },
      {
        title: "React Coding Challenges",
        content:
          "Practice building: A reusable modal component, a custom hook (e.g., useFetch), a HOC, a paginated data table, or a drag-and-drop interface.",
        code: `// Example: Custom useFetch hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}`,
        mdnLink: "https://reactjs.org/docs/hooks-custom.html",
      },
    ],
  },
};

const ReactRoadmap = () => {
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
            <FaReact size="32px" color="#61DAFB" />
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              React.js Roadmap
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
                        bg="teal.400"
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
                          colorScheme="teal"
                          children={subtopic.code}
                        />
                      </Box>
                    )}
                    
                    {subtopic.mdnLink && (
                      <Link
                        href={subtopic.mdnLink}
                        isExternal
                        fontSize="sm"
                        color="teal.500"
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
                Select a section from the sidebar to start learning React!
              </Text>
              <Badge colorScheme="teal" fontSize="lg" p={2}>
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
            React Topics
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
                      ? "teal.50"
                      : "teal.900"
                    : "transparent"
                }
                borderLeft={
                  selectedSection === section
                    ? "4px solid"
                    : "4px solid transparent"
                }
                borderColor="teal.400"
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
          colorScheme="teal"
          display={{ base: "block", md: "none" }}
        />
      </Flex>
    </Box>
  );
};

export default ReactRoadmap;