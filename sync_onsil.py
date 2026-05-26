import os
import shutil

def sync_all_files():
    print("--- onsil/ 폴더 생성 및 동기화 시작 ---")
    
    root_dir = "."
    onsil_dir = "onsil"
    
    if not os.path.exists(onsil_dir):
        os.makedirs(onsil_dir)
        print(f"onsil/ 디렉토리를 생성했습니다.")

    # 1. 루트에 있는 html 및 주요 PWA 파일 복사
    files_to_copy = [f for f in os.listdir(root_dir) if f.endswith('.html') or f in ['manifest.json', 'sw.js', 'robots.txt', 'sitemap.xml']]
    for filename in files_to_copy:
        src_path = os.path.join(root_dir, filename)
        dest_path = os.path.join(onsil_dir, filename)
        try:
            with open(src_path, 'r', encoding='utf-8') as src_file:
                content = src_file.read()
            with open(dest_path, 'w', encoding='utf-8') as dest_file:
                dest_file.write(content)
            print(f"성공: {filename} -> onsil/{filename}")
        except Exception as e:
            try:
                shutil.copy2(src_path, dest_path)
                print(f"성공(바이너리): {filename} -> onsil/{filename}")
            except Exception as e2:
                print(f"실패: {filename} 복사 중 오류 - {str(e2)}")

    # 2. 하위 폴더들 복사
    dirs_to_copy = ['js', 'images', 'components', 'icons', 'lib', 'resources']
    for d in dirs_to_copy:
        src_d = os.path.join(root_dir, d)
        dest_d = os.path.join(onsil_dir, d)
        if os.path.exists(src_d):
            if os.path.exists(dest_d):
                shutil.rmtree(dest_d)
            shutil.copytree(src_d, dest_d)
            print(f"폴더 복사 성공: {d}/ -> onsil/{d}/")

    print("--- 동기화 완료 ---")

if __name__ == "__main__":
    sync_all_files()
