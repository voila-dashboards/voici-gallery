# Contributing

Thank you for contributing to Voici Gallery!

Make sure to follow [Project Jupyter's Code of Conduct](https://github.com/jupyter/governance/blob/master/conduct/code_of_conduct.md)
for a friendly and welcoming collaborative environment.

## Setting up a development environment

Note: You will need NodeJS to build the extension package.

**Note**: we recommend using `mamba` to speed up the creation of the environment.

```bash
# create a new environment
mamba env create -f script/build-environment.yml
# activate the environment
mamba activate build-env
```

Install the dependencies

```bash
npm install
```

Build the frontend

```bash
npm install
```

In the build step, the repositories defined in the `script/gallery.yaml` file will be cloned and converted into static dashboards.
