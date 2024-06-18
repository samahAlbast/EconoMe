# TypeScript with Node.js and Express Setup

## Step-by-Step Setup

1. **Install Node.js and npm**

   Make sure you have Node.js and npm installed on your machine.
   
   You can download them from [Node.js official website](https://nodejs.org/).

3. **Initialize a new Node.js project**

   Run the following command to initialize a new Node.js project:
   ```sh
   npm init -y
    ```
   
   This will create a package.json file.

4. **Install TypeScript and related dependencies**

   Install TypeScript, Express, and necessary TypeScript definitions:
    ```sh
    npm install express
    npm install -D @types/express typescript ts-node
    ```
5. **Generating tsconfig.json**

    To generate this file, use the following tsc command:
    ```sh
    npx tsc --init
    ```

    Once this command is executed, a tsconfig.json file will be created.
   
    This file contains the default compiler options. 
