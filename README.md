Electric Power Research Intitute - The Cinnamon List
=
## Overview
Because of a lack of energy industry standards, energy companies create their own terms to refer to their components. This can cause a great deal of confusion for companies who work between these companies to craete better energy standards, such as the Electric Power Research Institute (EPRI). The Cinnamon List aims to solve this problem for EPRI by creating a single location to store the sysnonym terms from companies across the globe.
## Development
Since this python package is stored as a package, the `PYTHONPATH` environment variable must be updated to the working directory. This can be accomplished by running **one** of the two commands below.

- `export PYTHONPATH="${PYTHONPATH}:."`

- `export PYTHONPATH="${PYTHONPATH}:/path/to/project/folder"`

For Flask to run correctly as well, the `FLASK_APP` environment variable must be set. This can be accomplished in a similar manner.

- `export FLASK_APP=main`

Both of these commands can be added to the `~/.bashrc` file to be run on startup, or run each time manually.
## Testing
After setting up all of the environment variables to run the code, the code can be tested by running the command `flask run`.