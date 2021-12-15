# EPRI - The Cinnamon List

## Overview

Because of a lack of energy industry standards, energy companies create their own terms to refer to their components. This can cause a great deal of confusion for companies who work between these companies to craete better energy standards, such as the Electric Power Research Institute (EPRI). The Cinnamon List aims to solve this problem for EPRI by creating a single location to store the sysnonym terms from companies across the globe.

## Requirements

1. Python
2. Node (I recommend using [nvm](https://github.com/nvm-sh/nvm))
3. Node Package Manager (NPM) (Install with node)

## Backend

### Getting Started

First install the Python dependencies stored in `src/backend/requirements.txt`

Since the backend is stored as a package, the `PYTHONPATH` environment variable must be updated to the working directory. This can be accomplished by running **one** of the two commands below.

- `export PYTHONPATH="${PYTHONPATH}:."`

- `export PYTHONPATH="${PYTHONPATH}:/path/to/project/folder"`

For Flask to run correctly as well, the `FLASK_APP` environment variable must be set. This can be accomplished in a similar manner.

- `export FLASK_APP=main`

Both of these commands can be added to the `~/.bashrc` file to be run on startup, or run each time manually.

Once these steps are complete, the backend can be run executing the command `flask run` in the `src/backend` directory.

### Development

When making changes to the backend, it is generally required to relaunch the flask server in order to see these changes.

### Testing

Tests can be added to the `tst` folder in `src/backend/tst` as regular python files using th unittest module.

## Frontend

### Getting Started

In order to launch the frontend, navigate to the directory `src/frontend/src` and execute the command `npm install` to install all of the node package dependencies. Once that is complete, run `npm run` and it will begin building and running the site on localhost port 3000.

### Development

When making changes to the frontend code, react will automatically update whenever a file is changed. This prevent the need to releuch the react code when making changes.

### Testing

Tests can be added as `*.test.js` files within the source code. They can render the react components and test by content on the screen. These tests are run with `npm test` in the `src/frontend/src` directory.
