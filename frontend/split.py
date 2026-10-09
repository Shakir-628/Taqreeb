import os
import re
import io

def split_components():
    src_dir = 'c:/Users/Shakir/Desktop/Taqreeb/frontend/src'
    app_path = os.path.join(src_dir, 'App.jsx')
    comp_dir = os.path.join(src_dir, 'components')
    
    if not os.path.exists(comp_dir):
        os.makedirs(comp_dir)
        
    with io.open(app_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract sections based on tags
    components = {
        'Header': r'<header>.*?</header>',
        'Hero': r'<div className="hero">.*?</div>\s*</section>', # Includes the hero section
        'Categories': r'<section>\s*<div className="container">\s*<div className="section-head">\s*<h2>Everything for every event.*?</div>\s*</section>',
        'VendorList': r'<section id="vendors">.*?</section>',
        'Deals': r'<section className="deals">.*?</section>',
        'BudgetPlanner': r'<section className="planner">.*?</section>',
        'Footer': r'<footer>.*?</footer>',
        'Modals': r'<div className="modal".*?</div>\s*</div>\s*</div>' # Approximating modals
    }

    imports = []
    
    for comp_name, regex in components.items():
        match = re.search(regex, content, re.DOTALL | re.IGNORECASE)
        if match:
            comp_content = match.group(0)
            
            jsx = u"import React from 'react';\n\nexport default function " + comp_name + u"() {\n  return (\n    <>\n      " + comp_content + u"\n    </>\n  );\n}\n"
            
            with io.open(os.path.join(comp_dir, comp_name + '.jsx'), 'w', encoding='utf-8') as f:
                f.write(jsx)
                
            content = content.replace(comp_content, u"<{0} />".format(comp_name))
            imports.append(u"import {0} from './components/{0}';".format(comp_name))

    # Update App.jsx
    import_stmt = u'\n'.join(imports)
    content = content.replace(u"import './index.css';", u"import './index.css';\n" + import_stmt)
    
    with io.open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    split_components()
