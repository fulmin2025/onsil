import os
import shutil

def fix():
    # Sync all HTML files from root to onsil/ to fix encoding
    target_files = [f for f in os.listdir('.') if f.endswith('.html')]
    for f in target_files:
        if os.path.exists(os.path.join('onsil', f)):
            shutil.copy(f, os.path.join('onsil', f))
            print(f"Restored: onsil/{f}")

if __name__ == "__main__":
    fix()
