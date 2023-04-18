# Voici Gallery

![Github Actions Status](https://github.com/trungleduc/voici-gallery/actions/workflows/deploy.yml/badge.svg)

This is a gallery of [Voici](https://github.com/voila-dashboards/voici) examples. View the gallery at https://trungleduc.github.io/voici-gallery/

## Contributing new examples

1. Create a repository with your notebook. You can start from the [voici-demo](https://github.com/voila-dashboards/voici-demo) example.
2. Create a PR to [Voici gallery](https://github.com/trungleduc/voici-gallery) that
   modifies `script/gallery.yaml` file.
   You will need to fill in the following fields:
   - `title`: the title used in the page thumbnail.
   - `description`: the description used in the page thumbnail.
   - `repo_url`: the URL of the repository containing the notebooks and resources used to build the Voici dashboard.
   - `content_path`: the local path to the notebooks, this path will be passed to the `--contents` parameter of `Voici` command, default to `.`
   - `branch`: the branch to be checked out from `repo_url` repository, default to `main`.
   - `image_url`: the URL of the picture to use as thumbnail.
3. Once the PR is merged into `main`, the gallery is automatically redeployed and the new example will be visible shortly after.

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more detail on developing the gallery.

## Related projects

- [Voici](https://github.com/voila-dashboards/voici): Voici turns any Jupyter Notebook into a static web application
