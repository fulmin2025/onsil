import os
import shutil

def final_sync():
    print("=== [The 온실] 배포 폴더 최종 동기화 시작 ===")
    
    source_dir = "."
    target_dir = "onsil"
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        print(f"알림: {target_dir} 폴더 생성됨")

    # 동기화할 파일 확장자들
    sync_extensions = ['.html', '.json', '.js', '.css', '.png', '.jpg', '.svg', '.gif']
    # 제외할 폴더들
    exclude_dirs = {'.git', '.github', 'android', 'ios', 'onsil', 'backups', 'onsil_backup_0401', 'onsil_mess_backup', 'app'}

    for root, dirs, files in os.walk(source_dir):
        # 제외할 폴더 건너뛰기
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if any(file.endswith(ext) for ext in sync_extensions):
                src_path = os.path.join(root, file)
                
                # 상대 경로 계산
                rel_path = os.path.relpath(src_path, source_dir)
                dest_path = os.path.join(target_dir, rel_path)
                
                # 목적지 폴더 생성
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                
                try:
                    shutil.copy2(src_path, dest_path)
                    # print(f"동기화 성공: {rel_path}")
                except Exception as e:
                    print(f"오류 발생 ({rel_path}): {str(e)}")

    print("=== 동기화 완료 ===")

if __name__ == "__main__":
    final_sync()
