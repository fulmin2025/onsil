import os
import shutil

def sync_html_files():
    print("--- onsil/ 폴더 한글 깨짐 복구 및 동기화 시작 ---")
    
    root_dir = "."
    onsil_dir = "onsil"
    
    if not os.path.exists(onsil_dir):
        print(f"오류: {onsil_dir} 디렉토리가 존재하지 않습니다.")
        return

    # 동기화할 파일 목록
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    for filename in html_files:
        src_path = os.path.join(root_dir, filename)
        dest_path = os.path.join(onsil_dir, filename)
        
        try:
            # 루트 파일을 UTF-8로 읽어서 onsil 폴더에 UTF-8로 저장 (BOM 없이)
            with open(src_path, 'r', encoding='utf-8') as src_file:
                content = src_file.read()
                
            with open(dest_path, 'w', encoding='utf-8') as dest_file:
                dest_file.write(content)
                
            print(f"성공: {filename} -> onsil/{filename} (한글 복구 완료)")
            
        except Exception as e:
            print(f"실패: {filename} 처리 중 오류 발생 - {str(e)}")

    print("--- 동기화 완료 ---")

if __name__ == "__main__":
    sync_html_files()
