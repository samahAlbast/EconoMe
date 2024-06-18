TypeScript with Node.js and Express Setup
Step-by-Step Setup
1. Install Node.js and npm
Make sure you have Node.js and npm installed on your machine. You can download them from Node.js official website.
2. Initialize a new Node.js project
Run the following command to initialize a new Node.js project:
npm init -y
This will create a package.json file.
3. Install TypeScript and related dependencies
Install TypeScript, Express, and necessary TypeScript definitions:
npm install express
npm install -D @types/express typescript ts-node
4. Create a tsconfig.json file
Create a tsconfig.json file in the project root:
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}


