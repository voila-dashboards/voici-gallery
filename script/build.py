from ast import Dict, List
import json
from pathlib import Path

import subprocess
import sys
from typing import Optional
import yaml
import logging

from utils import create_dir, delete_file_by_extension

logger = logging.getLogger(__file__)
ROOT_DIR = Path(__file__).parents[1]
VOICI_BUILD_DIR = ROOT_DIR / "voici_build"
VOICI_STATIC_DIR = VOICI_BUILD_DIR / "voici"
GIT = "git"
VOICI = "voici"


class Builder:
    def __init__(self, config_path: Path, debug=False) -> None:
        self._debug = debug
        self.load_config(config_path)
        create_dir(VOICI_BUILD_DIR)
        create_dir(VOICI_STATIC_DIR)
        self._artifact = []

    def load_config(self, config_path: Path) -> None:
        with open(config_path, "r") as f:
            self._yaml_data: List[Dict] = yaml.load(f, Loader=yaml.CLoader)

    def build(self) -> None:
        for idx, config in enumerate(self._yaml_data):
            self.build_single(idx, config)
        
        artifact_path = ROOT_DIR / 'src' / 'dashboard.json'
        with open(artifact_path, 'w') as f:
            json.dump(self._artifact, f, indent=2)

    def build_single(self, index: int, config: Dict) -> None:
        repo_path = VOICI_BUILD_DIR / str(index)
        create_dir(repo_path)
        cloned = self.clone_repo(config["repo_url"], config.get("branch"), repo_path)
        if cloned:
            dashboard_url = self.build_voici(repo_path, config.get("content_path", "."), index)
            if dashboard_url is not None:
                config['dashboard_url'] = dashboard_url
                self._artifact.append(config)

    def clone_repo(self, url: str, branch: Optional[str], dest: Path) -> bool:
        branch = branch or "main"
        cmd = ["git", "clone", "-b", branch, url, str(dest)]
        logger.debug(f"Cloning {url} at {branch}")
        try:
            subprocess.run(cmd)
            return True
        except Exception as e:
            if self._debug:
                raise
            logger.error(e)
            return False

    def build_voici(self, repo_path: Path, content_path: str, index: int) -> Optional[str]:
        output_dir = VOICI_STATIC_DIR / str(index)
        logger.debug(f"Building voici from {repo_path} to {output_dir}")
        cmd = [ "voici", "build", "--contents", content_path, "--output-dir", output_dir]

        try:
            subprocess.run(cmd, cwd=repo_path)
            # Remove map files to save space
            delete_file_by_extension(output_dir, 'js.map')
            return f"voici/{index}"
        except Exception as e:
            if self._debug:
                raise
            logger.error(e)
            return None      

if __name__ == "__main__":
    debug = "--debug" in sys.argv
    if debug:
        logging.basicConfig(level=logging.DEBUG)

    config_file = ROOT_DIR / "script" / Path("gallery.yaml")
    builder = Builder(config_file, debug=debug)
    builder.build()
