#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import fs from 'fs';


// argument accessing

const args = process.argv;
const currentWorkingDirectory = args[1].slice(0, -8);

// creating todo files
if (fs.existsSync(currentWorkingDirectory + 'todo.txt') === false) {
    let createStream = fs.createWriteStream('todo.txt');
    createStream.end();
    }
    if (fs.existsSync(currentWorkingDirectory + 'done.txt') === false) {
    let createStream = fs.createWriteStream('done.txt');
    createStream.end();
    }
    

// title
console.log(chalk.cyanBright(figlet.textSync("DoThat", { horizontalLayout: "full" })));

// set timeout of 2000ms to promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// create async function welcome
const welcome = async () => {
    const decorTitle = chalkAnimation.rainbow(" A ToDo app from Adithya Nandakumar");
    await delay(4000);
    decorTitle.stop();

    console.log(process.argv)

    console.log(`
    ${chalk.bgRedBright('COMMANDS:')}

    npx do_that_1.1${chalk.yellow(' new ')}  :    Create a new task
    npx do_that_1.1${chalk.yellow(' get ')}  :    Retrieve your tasks
    npx do_that_1.1${chalk.yellow(' done ')} :    Mark as complete
    npx do_that_1.1${chalk.yellow(' help ')} :    Help
    npx do_that_1.1${chalk.yellow(' exit ')} :    Exit the app
    `);
}






// addfunction
const addFunction = async () => {

    // create spinner with string Creating Task....
    const spinner = createSpinner('Creating Task....').start();
    await delay(2000);
    spinner.stop();

    // New todo string argument is stored
    const newTask = args[3];
    
    // If argument is passed
    if (newTask) {
    
        // Create a empty array
        let data = [];
    
        // Read the data from file todo.txt and
        // convert it in string
        const fileData = fs
        .readFileSync(currentWorkingDirectory + 'todo.txt')
        .toString();
        
        // New task is added to previous data
        fs.writeFile(
        currentWorkingDirectory + 'todo.txt',
        newTask + '\n' + fileData,
        
        function (err) {
    
            // Handle if there is any error
            if (err) throw err;
            
            // Logs the new task added
            console.log('Added todo: "' + newTask + '"');
        },
        );
    } else {
    
        // If argument was no passed
        console.log('Error: Missing todo string. Please add the task string to the command.');
    }
    };



// getfunction
const getFunction = async() => {

    const spinner = createSpinner('Fetching current tasks....').start();
    await delay(2000);
    spinner.stop();
    // Create a empty array
    let data = [];
    
    // Read from todo.txt and convert it
    // into a string
    const fileData = fs.readFileSync(
        currentWorkingDirectory + 'todo.txt')
    .toString();
    
    // Split the string and store into array
    data = fileData.split('\n');
    
    // Filter the string for any empty lines in the file
    let filterData = data.filter(function (value) {
        return value !== '';
    });
    
    if (filterData.length === 0) {
        console.log('There are no pending todos! Hurray!!');
    }
    
    for (let i = 0; i < filterData.length; i++) {
        console.log((filterData.length - i) + '. '
        + filterData[i]);
    }
    };
    


// donefunction
const doneFunction = async() => {

    // Store the index passed as argument
    const doneIndex = args[3];
    
    // If argument is passed
    if (doneIndex) {
    
        // Empty array
        let data = [];
        
        // Create a new date object
        let dateobj = new Date();
        
        // Convert it to string and slice only the
        // date part, removing the time part
        let dateString = dateobj.toISOString().substring(0, 10);
        
        // Read the data from todo.txt
        const fileData = fs
        .readFileSync(currentWorkingDirectory + 'todo.txt')
        .toString();
        
        // Read the data from done.txt
        const doneData = fs
        .readFileSync(currentWorkingDirectory + 'done.txt')
        .toString();
        
        // Split the todo.txt data
        data = fileData.split('\n');
        
        // Filter for any empty lines
        let filterData = data.filter(function (value) {
        return value !== '';
        });
        
        // If done index is greater than no. of task or <=0
        if (doneIndex > filterData.length || doneIndex <= 0) {
        console.log('Error: todo #'
            + doneIndex + ' does not exist.');
        } else {
    
        // Delete the task from todo.txt
        // data and store it
        const deleted = filterData.splice(
            filterData.length - doneIndex, 1);
        
        // Join the array to create a string
        const newData = filterData.join('\n');
        
        // Write back the data in todo.txt
        fs.writeFile(
            currentWorkingDirectory + 'todo.txt',
            newData,
            function (err) {
            if (err) throw err;
            },
        );
        
        // Write the stored task in done.txt
        // along with date string
        fs.writeFile(
            currentWorkingDirectory + 'done.txt',
            'x ' + dateString + ' ' + deleted
            + '\n' + doneData,
            function (err) {
            if (err) throw err;
            console.log('Marked todo #'
                + doneIndex + ' as done! Good job!');
            },
        );
        }
    } else {
    
        // If argument was not passed
        console.log('Error: Missing NUMBER for'
            + ' marking todo as done.');
    }
    };



// helpfunction
const helpFunction = async() => {
    console.log(`
    ${chalk.bgRedBright('COMMANDS:')}

    do_that_1.1${chalk.yellow(' new ')}   :    Create a new task
    do_that_1.1${chalk.yellow(' get :')}  :    Retrieve your tasks
    do_that_1.1${chalk.yellow(' done :')} :    Mark as complete
    do_that_1.1${chalk.yellow(' help :')} :    Help
    do_that_1.1${chalk.yellow(' exit :')} :    Exit the app

    ${chalk.bgMagentaBright('LOCAL COMMANDS:')}

    $node index.js new  :    Create a new task
    $node index.js get  :    Retrieve your tasks
    $node index.js done :    Mark as complete
    $node index.js help :    Show help
    $node index.js exit :    Exit the app
    `);

}


//exitfunction
const exitFunction = async() => {
     // create spinner with string Creating Task....
    const spinner = createSpinner('Exiting app....').start();
    await delay(2000);
    spinner.stop();
    process.exit();
}




// the Switch case
switch (args[2]) {
    case 'new': {
        addFunction();
        break;
    }
    
    case 'get': {
        getFunction();
        break;
    }

    
    case 'done': {
        doneFunction();
        break;
    }

    case 'help': {
        helpFunction();
        break;
    }

    case 'exit': {
        exitFunction();
        break;
    }
    
    
    default: {
        await welcome();
    }
    }
    

    


