import os
import re
import io

comp_dir = 'src/components'
for file in os.listdir(comp_dir):
    if file.endswith('.jsx'):
        path = os.path.join(comp_dir, file)
        with io.open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace onclick="something" with onClick={() => {}}
        new_content = re.sub(r'onclick="[^"]*"', 'onClick={() => {}}', content)
        
        # Also replace class= with className=
        new_content = re.sub(r' class="', ' className="', new_content)
        
        if content != new_content:
            with io.open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Fixed ' + file)
