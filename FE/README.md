# React + TypeScript + Vite

## Step-by-Step Setup

1. **Install Node.js and npm**

   Make sure you have Node.js and npm installed on your machine.
   
   You can download them from [Node.js official website](https://nodejs.org/).

2. **Initialize a new Node.js project**

    Create a Vite project by running the following command in the terminal:
     ```sh
      npm create vite@latest
     ```

    This command will prompt you to choose a name for your project. For this demo, we'll use "FE" as the app name.

    Next, you’ll be asked to select a framework for your Vite project. Choose React.

    Finally, you’ll be prompted to choose a variant for your application. Since we're building a TypeScript app with Vite, select TypeScript.

    After submitting the project information, Vite will generate the project’s folder structure.

   Currently, two official plugins are available:

  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  
4. **Install React Router Typescript**

    ```sh
     npm install react-router-dom
    ```


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


