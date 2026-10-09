const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'src', 'components', 'Header.jsx');
let content = fs.readFileSync(headerPath, 'utf8');

if (!content.includes('react-router-dom')) {
  content = content.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';");
}

content = content.replace('<div className="brand">', '<Link to="/" className="brand" style={{textDecoration: "none", color: "inherit"}}>');
content = content.replace('</div>\n    <nav className="navlinks">', '</Link>\n    <nav className="navlinks">');

content = content.replace(/<a href="#([^"]+)">([^<]+)<\/a>/g, '<a href="/#$1" onClick={(e) => { if(window.location.pathname==="/") { e.preventDefault(); document.getElementById("$1")?.scrollIntoView({behavior:"smooth"}); } }}>$2</a>');

fs.writeFileSync(headerPath, content, 'utf8');
console.log('Fixed Header.jsx');
