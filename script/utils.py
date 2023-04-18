import os
import shutil
from pathlib import Path

def create_dir(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
    path.mkdir()

def delete_file_by_extension(path: str, ext: str):
    for root, dirs, files in os.walk(path):
        for name in files:
            if ext in name:
                os.unlink(os.path.join(root, name))