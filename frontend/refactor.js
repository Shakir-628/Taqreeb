const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add BrowserRouter import
if (!content.includes('BrowserRouter')) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';");
}
if (!content.includes('VendorDetails')) {
  content = content.replace("import Header", "import VendorDetails from './components/VendorDetails';\nimport Header");
}

// 2. State & API fetch
content = content.replace("const [category, setCategory] = useState('');", "const [category, setCategory] = useState('');\n  const [area, setArea] = useState('');");
content = content.replace("const url = category ? `http://localhost:4000/api/vendors?category=${category}` : 'http://localhost:4000/api/vendors';", "const url = `http://localhost:4000/api/vendors?category=${category}&area=${area}`;");
content = content.replace("}, [category]);", "}, [category, area]);");

// 3. Update the select element
content = content.replace('<select id="locationSelect">', '<select id="locationSelect" value={area} onChange={e => setArea(e.target.value)}><option value="">All Locations</option>');

// 4. Wrap with Home and App Router
const appStartIdx = content.indexOf('function App() {');
const returnIdx = content.indexOf('return (', appStartIdx);

const prefix = content.substring(0, returnIdx);
const inner = content.substring(returnIdx, content.lastIndexOf('}'));

const newContent = `
${prefix.replace('function App() {', 'function Home() {')}
  ${inner}
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
`;

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Done refactoring');
