import re
import io

def convert_to_jsx(html_path, out_path):
    with io.open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
    if not body_match:
        print("No body found")
        return
    body = body_match.group(1)
    
    body = body.replace('class="', 'className="')
    body = body.replace('for="', 'htmlFor="')
    body = body.replace('<!--', '{/*')
    body = body.replace('-->', '*/}')
    body = body.replace('style="', 'data-style="')
    
    for tag in ['img', 'input', 'br', 'hr']:
        body = re.sub(r'<(%s[^>]*?)(?<!/)>' % tag, r'<\1 />', body, flags=re.IGNORECASE)

    jsx = """import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/vendors')
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app">
      {body}
    </div>
  );
}

export default App;
""".replace('{body}', body)
    
    with io.open(out_path, 'w', encoding='utf-8') as f:
        f.write(jsx)

if __name__ == '__main__':
    convert_to_jsx('../Final taqreeb.html', 'src/App.jsx')
