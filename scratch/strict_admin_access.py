
import os

target = 'admin_funeral_homes.html'

if os.path.exists(target):
    with open(target, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Define the old block (including the corrupted part)
    old_block_start = 'async function checkAdmin() {'
    old_block_end = 'loadFuneralHomes();\n            }\n        }'
    
    # New strict block
    new_block = """        async function checkAdmin() {
            try {
                const user = await Auth.getCurrentUser();
                const adminEmails = ["fulmin@nate.com","theonsil@gmail.com","admin@theonsil.co.kr","theonsilofficial@gmail.com","admin@onsil.com"];
                const isAdmin = user && (user.role === "admin" || adminEmails.includes(user.email?.toLowerCase()));
                
                if (!isAdmin) {
                    alert('관리자 권한이 필요합니다.');
                    location.href = 'index.html';
                    return;
                }
                
                loadFuneralHomes();
            } catch (err) {
                console.error('Admin Access Error:', err);
                location.href = 'index.html';
            }
        }"""

    # We use a more flexible replacement to avoid exact string match issues with corrupted chars
    import re
    # Match the whole checkAdmin function
    content = re.sub(r'async function checkAdmin\(\) \{.*?loadFuneralHomes\(\);\s*\}\s*\}', new_block, content, flags=re.DOTALL)

    with open(target, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated admin_funeral_homes.html")
