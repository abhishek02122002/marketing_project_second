import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const codeSnippets = [
  'const x = 25;',
  'function hello() {}',
  '<div className="app"></div>',
  'console.log("Hi")',
  'import React from "react"'
];

const  FloatingCode = () => {
  return (
    <Box position="fixed" top={0} left={0} w="100%" h="100%" zIndex={-1} overflow="hidden">
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            transition: {
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          style={{
            position: 'absolute',
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            opacity: 0.3,
            fontSize: `${14 + Math.random() * 10}px`,
            fontFamily: 'monospace'
          }}
        >
          {code}
        </motion.div>
      ))}
    </Box>
  );
};

export default FloatingCode;


const FloatingCodeAnimation = ({ colorMode }) => {
     const isMobile = useBreakpointValue({ base: true, md: false });
     
     // Expanded set of code snippets covering various languages and concepts
     const codeSnippets = [
       // JavaScript/React
       'const [count, setCount] = useState(0);',
       'useEffect(() => { document.title = `Count: ${count}`; }, [count]);',
       '<button onClick={() => setCount(c => c + 1)}>Increment</button>',
       'const data = await fetch("/api/data");',
       'const user = useContext(UserContext);',
       'const router = useRouter();',
       'export default function App() { return (...) }',
       
       // HTML/CSS
       '<div className="container mx-auto p-4"></div>',
       '@media (max-width: 768px) { ... }',
       'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
       'transform: translateX(-50%);',
       'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);',
       
       // API/Database
       'GET /api/users/:id',
       'db.collection("users").findOne({ id: 123 });',
       'mongoose.connect(process.env.MONGODB_URI);',
       'await prisma.user.create({ data: { ... } });',
       
       // Node.js
       'app.get("/", (req, res) => res.send("Hello"));',
       'const server = http.createServer(app);',
       'fs.readFileSync("data.json");',
       
       // Python
       'def calculate_total(items): return sum(items)',
       'with open("data.txt") as f: content = f.read()',
       'list(filter(lambda x: x > 0, numbers))',
       
       // DevOps
       'FROM node:16-alpine',
       'docker-compose up --build',
       'kubectl apply -f deployment.yaml',
       
       // Testing
       'expect(element).toBeInTheDocument();',
       'test("renders login form", () => { ... });',
       'cy.get("[data-testid=submit]").click();',
       
       // General Programming
       'const result = array.map(x => x * 2);',
       'for (const [key, value] of Object.entries(obj)) { ... }',
       'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);'
     ];
   
     // Configuration based on screen size
     const numElements = isMobile ? 25 : 40; // Increased number of elements
     const fontSizeRange = isMobile ? [12, 18] : [14, 22];
     const movementRange = 120; // Wider movement range
   
     return (
       <Box 
         position="absolute" 
         top={0} 
         left={0} 
         w="100%" 
         h="100%" 
         zIndex={0}
         opacity={0.2} // Increased visibility
         overflow="hidden"
         pointerEvents="none"
       >
         {codeSnippets.slice(0, numElements).map((code, i) => {
           // Generate random path that covers the entire footer
           const startX = Math.random() * 100;
           const startY = Math.random() * 100;
           const path = [
             { x: startX, y: startY },
             { x: (startX + Math.random() * movementRange - movementRange/2) % 100, 
               y: (startY + Math.random() * movementRange/2) % 100 },
             { x: (startX + Math.random() * movementRange - movementRange/2) % 100, 
               y: (startY + Math.random() * movementRange - movementRange/2) % 100 },
             { x: (startX + Math.random() * movementRange/2) % 100, 
               y: (startY + Math.random() * movementRange - movementRange/2) % 100 }
           ];
   
           return (
             <motion.div
               key={i}
               initial={{
                 x: `${path[0].x}%`,
                 y: `${path[0].y}%`,
                 rotate: Math.random() * 20 - 10,
                 opacity: 0
               }}
               animate={{
                 x: [`${path[0].x}%`, `${path[1].x}%`, `${path[2].x}%`, `${path[3].x}%`],
                 y: [`${path[0].y}%`, `${path[1].y}%`, `${path[2].y}%`, `${path[3].y}%`],
                 rotate: [Math.random() * 20 - 10, Math.random() * 30 - 15, 
                         Math.random() * 20 - 10, Math.random() * 10 - 5],
                 opacity: [0, 1, 0.8, 0], // More visible during movement
                 transition: {
                   duration: 40 + Math.random() * 30, // Slower movement
                   repeat: Infinity,
                   repeatType: "loop",
                   ease: "linear",
                   times: [0, 0.3, 0.7, 1]
                 }
               }}
               style={{
                 position: 'absolute',
                 color: colorMode === 'light' ? 'blue.700' : 'blue.300',
                 fontSize: `${fontSizeRange[0] + Math.random() * (fontSizeRange[1] - fontSizeRange[0])}px`,
                 fontFamily: '"Fira Code", monospace',
                 whiteSpace: 'nowrap',
                 fontWeight: 500,
                 textShadow: colorMode === 'light' 
                   ? '1px 1px 4px rgba(0,0,0,0.15)' 
                   : '1px 1px 4px rgba(0,0,0,0.5)',
                 filter: `brightness(${colorMode === 'light' ? '100%' : '140%'})`,
                 padding: '2px 6px',
                 borderRadius: '4px',
                 backgroundColor: colorMode === 'light' 
                   ? 'rgba(235, 245, 255, 0.3)' 
                   : 'rgba(7, 47, 95, 0.3)'
               }}
             >
               {code}
             </motion.div>
           );
         })}
       </Box>
     );
   };