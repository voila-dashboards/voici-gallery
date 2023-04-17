from ast import Dict, List
from pathlib import Path
import yaml
import voici

class Builder:
    def __init__(self, config_path: Path) -> None:
        self.load_config(config_path)

    def load_config(self, config_path: Path) -> None:
        with open(config_path, "r") as f:
            self._yaml_data: List[Dict] = yaml.load(f, Loader=yaml.CLoader)

    def build(self) -> None:
        for config in self._yaml_data:
            self.build_single(config)

    def build_single(self, config: Dict) -> None:
        pass


if __name__ == "__main__":
    config_file = Path(__file__).parent / Path("gallery.yaml")
    builder = Builder(config_file)
    builder.build()
