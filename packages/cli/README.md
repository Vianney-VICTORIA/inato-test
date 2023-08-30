# CLI

This package is the beginning of a CLI built using [commander.js](https://github.com/tj/commander.js).

## Installation

Step 1: Install the dependencies:
```sh
yarn install
```

Step 2: Compile the package:
```sh
yarn compile
```
Step 3: Install the package globally:
```sh
npm install -g .
```

Step 4: You can now run the CLI from anywhere, here the `-h` option to display the help:
```sh   
inato-cli -h 
```

## Usage

- For this test you will have to make sure to run the API first. You can find the instructions [here](../../api/README.md).
( Note: Once the API deployed you could change the `API_URL` in the `.env` file to point to the deployed API. You will have to recompile the package and reinstall it globally. )


- The inato-cli is a command line interface that allows you to interact with the API. It has 1 command:
    - `inato-cli trials [options]`
    - `inato-cli trials` : List all the trials. You can use the following options:
      - `-c, --country <countryCode>` : Filter by countryCode e.g: fr
      - `-s, --sponsor <sponsor>` : Filter by sponsr name e.g: Sanofi
      - `-t, --table` : Display the result in a table (Special option - you will need a BIG screen 😅)
      - `-h, --help` : Display the help


- Example:
  - `inato-cli trials -c fr -s Sanofi` : List all the trials in France sponsored by Sanofi.
  - `inato-cli trials -c fr` : List all the trials in France.
  - `inato-cli trials` : List all the trials.

## Possible improvements

- Add Options to export the result in a file (csv, json, ...)
