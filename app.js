const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const initialQuestions = () => {

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email",
            default: () => { },
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is your office number?"
        }
    ]);
}

const engineerQuestions = () => {
   return inquirer.prompt([
        
        {
            type: "input",
            name: "name",
            message: "Enter your Engineers name: "
        },
        {
            type: "number",
            name: "id",
            message: "Enter your Engineers ID number: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter your Engineers Email: ",
            default: () => { },
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your Engineers GitHub user name: "
        },
        {
            type: "confirm",
            name: "addEngineer",
            message: "Would you like to add another Engineer?"
        },
    ]);
};

const internQuestions = () => {
    return inquirer.prompt([
         
         {
             type: "input",
             name: "name",
             message: "Enter your Intern's name: "
         },
         {
             type: "number",
             name: "id",
             message: "Enter your Intern's ID number: "
         },
         {
             type: "input",
             name: "email",
             message: "Enter your Intern's Email: ",
             default: () => { },
             validate: function (email) {
 
                 valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
 
                 if (valid) {
                     return true;
                 } else {
                     console.log(".  Please enter a valid email")
                     return false;
                 }
             }
         },
         {
             type: "input",
             name: "school",
             message: "Enter your Intern's school: "
         },
         {
             type: "confirm",
             name: "addIntern",
             message: "Would you like to add another Intern?"
         },
     ]);
 };


initialQuestions().then((answers) => {
    const manager = new Manager(answers.name, 1, answers.email, answers.officeNumber);
    allEmployees.push(manager);
    console.log("----- ENGINEERS -----")

    engineerQuestions().then((answers) => {
        saveEngineer(answers);

    });
});




const saveEngineer = (answers) => {
    // const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    allEmployees.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
    // console.log(engineer);
    if(answers.addEngineer){
        engineerQuestions().then((answers) => {
            saveEngineer(answers);
        });
    } else {
        // console.log(allEmployees);
        console.log("----- INTERS -----");

        internQuestions().then((answers) => {
            saveIntern(answers);
            
        });
    }
};





const saveIntern = (answers) => {
    
    allEmployees.push(new Intern(answers.name, answers.id, answers.email, answers.school))
   
    if(answers.addIntern){
        internQuestions().then((answers) => {
            saveIntern(answers);
        });
    } else {
        // console.log(allEmployees);
        fs.writeFile(outputPath, render(allEmployees), function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Success! your page has been created!");
          
          });
        return
    }
};
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
