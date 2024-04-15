# Publishing an npm package with Typescript, ES6, and CommonJS support

This project serves two purposes:

1. Demonstrate how to publish an npm package that can support CommonJS, ES6, or Typescript based projects
2. The `code` serves as a project template that can be used as starting point for an npm package. Feel free to fork or clonse this project as starting point of a new npm package.

## Publishing the npm package

For this project, the npm package will export a function that takes a name and returns `Hello, name`. The package, which is directory `code`, will have a final src structure that is scalable to support multiple modules.

```
├── src
│   ├── modules
│   │   ├── *.module.js
|   |   ├── *.module.d.ts
│   ├── index.js
|   ├── index.d.ts
├── build.js
├── package.json
```

The files with suffix `.d.ts` are the typescript definitions that will allow support for Typescript. Read more about it in the Typescript section below.

### Prerequisites

1. This project was created using `npm 10.2.5` and `node v18.18.0`.
2. The global `node_modules` should be created where write permission is available.

### Creating the base to support ES6

1. Create a directory called `skeleton-npm` (or any other name). Initialize the project using npm to create the project structure with default configuration

```
npm init -y
```

This should have generated a file called `package.json`

2. Specify the npm package type as `module`. This will look like the following in the package.json as follows:

```
{
    \\other properties removed for brevity
    "type": "module"
}
```

3. Create directory named `src` and inside create another directory called `modules`. This structure demonstrates a modular way to expand the constructs (e.g. function, class) that can be exported by this package.

4. Inside `modules` directory create a file called `greeter.module.js`. Inside, type the following

```
function createHelloGreeting(name){
    return `Hello ${name}`;
}

export { createHelloGreeting };
```

The `export` keyword is used export to make functions, objects, or variables available for use in other files or modules;

5. In `src` create an index.js file and export the contents of `greeter.module.js`:

```
import { createHelloGreeting } from './modules/greeter.module.js';

export { createHelloGreeting };
```

#### Testing the ES6 npm package

1. To test the package locally, execute the `npm link` command in the directory containing the package. This command creates a symbolic link from the global `node_modules` that points to the package currently being implemented.

2. Create a new directory (e.g. `mkdir ~/.test-skeleton-npm`). Go in the directory and execute `npm link skeleton-npm` assuming the name of the package created is `skeleton-npm`. The command links the testing project to `skeleton-npm`.

3. In root of test directory, create an `testrun.mjs` file and import the library using ES6 syntax:

```
\\inside <test-directory>\testrun.js
import {createHelloGreeting} from 'skeleton-npm';

const greeting = createHelloGreeting('Adrian');
console.log(greeting); 
```

4. Execute `node testrun.mjs`. With above code, this should print `Hello Adrian`. 

![Testing the ES6 npm package](demo_materials/Testing_ES6_Support.png)

##### Note for testing ES6 support

NodeJS will use ES6 module mechansim if the Javascript file has a suffix `.mjs`. We can achieve the same testing without using this suffix (just `.js`) by initializing the test directory with command `npm init -y` and specify the type property as `module`. 

### Adding Typescript support

To support Typescript, we can take advantage of typescript definitions. Definitions provide type information about entities in JavaScript code. They are used by the TypeScript compiler to understand the shape of JavaScript libraries and enable type-checking when using those libraries in TypeScript projects.

1. Create definition files `.d.ts` for all exporting `.js`files

```
//greeter.module.d.ts
declare function createHelloGreeting(html: string): string;

export { createHelloGreeting };
```

```
//index.d.ts
export { createHelloGreeting } from './modules/greeter.module';
```

2. Specify the definitions entry point in npm package definition

```
//package.json. Other properties removed for brevity
{
    "types": "src/index.d.ts"
}
```

Mentioning the types is optional but mentioning it in the package's package.json helps TypeScript locate and use the associated TypeScript definition file (.d.ts) for your package. The following are its benefits:

* Automatic Type Inference - hen TypeScript users install your package via npm or yarn, TypeScript automatically looks for the types field in your package's package.json. If TypeScript finds a types field, it uses the specified path to locate the TypeScript definition file provided by your package.

* Type Checking and IntelliSense Support - Once TypeScript locates the TypeScript definition file specified in the types field, it automatically uses it to provide type checking and IntelliSense support for the package's API. TypeScript users can import symbols from your package and receive accurate type information and autocomplete suggestions based on the definitions in the TypeScript definition file.

* Simplified Usage - Specifying the types field in your package's package.json simplifies the process for TypeScript users by providing a direct path to the type definitions. Users don't need to manually configure TypeScript paths or search for type definitions in the node_modules directory.