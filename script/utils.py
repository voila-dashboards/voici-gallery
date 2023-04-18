import shutil
from pathlib import Path

def create_dir(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
    path.mkdir()
