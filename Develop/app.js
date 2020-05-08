const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var team = [];

managerQuestions();
function managerQuestions(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message : "What is your manager's name?"
        },
        {
            name: "email",
            type: "input",
            message : "What is your manager's email ?"
        },
        {
            name: "id",
            type: "input",
            message : "What is your manager's id?"
        },
        {
            name: "officeNumber",
            type: "number",
            message : "What is your manager's number?"
        },
        
    ]).then(response =>{
        console.log("Mangers ANswers ");
        const manager = new Manager(response.name,response.email,response.id,response.officeNumber);
        //Add all memeber info to the array 
        team.push(manager);
        addTeamMember();
    })
    .catch(error => {
        if(error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("I do not know what is wrong");
        }
    });
}
function engineerQuestions(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message : "What is your engineer's name?"
        },
        {
            name: "email",
            type: "input",
            message : "What is your engineer's email ?"
        },
        {
            name: "id",
            type: "input",
            message : "What is your engineer's id?"
        },
        {
            name: "github",
            type: "input",
            message : "What is your manager's GitHub username?"
        }
        
    ]).then(function(response){
        const engineer = new Engineer(response.name,response.email,response.id,response.github);
        team.push(engineer);
        addTeamMember();
    })
    .catch(error => {
        if(error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("I do not know what is wrong");
        }
    });
}

function internQuestions(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message : "What is your intern's name?"
        },
        {
            name: "email",
            type: "input",
            message : "What is your intern's email ?"
        },
        {
            name: "id",
            type: "input",
            message : "What is your intern's id?"
        },
        {
            name: "school",
            type: "input",
            message : "What is your intern's school?"
        }
        
    ]).then(function(response){
        const intern = new Intern(response.name,response.email,response.id,response.github);
        team.push(intern);
        addTeamMember();
    })
    .catch(error => {
        if(error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("I do not know what is wrong");
        }
    });
}


function addTeamMember(){
    inquirer.prompt([
        {
            name: "member",
            type : "list",
            message : "What type of team members would you like to add ?",
            choices: [
                "Engineer",
                "Intern",
                "I do not want to add any more members",
            ]
        }
    ]).then(function(response){

        if(response.member === "Engineer"){
            engineerQuestions();
        }
        else if(response.member === "Intern"){
            internQuestions();
        }else{
            console.log("TEAM IS " + team);
            console.log("PATH IS "+ outputPath, render); 
            fs.writeFile(outputPath, render(team), (err) => {
            if (err) {
              throw error;}  
            })
        }       
    });
}













// // Write code to use inquirer to gather information about the development team members,
// // and to create objects for each team member (using the correct classes as blueprints!)

// // After the user has input all employees desired, call the `render` function (required
// // above) and pass in an array containing all employee objects; the `render` function will
// // generate and return a block of HTML including templated divs for each employee!

// // After you have your html, you're now ready to create an HTML file using the HTML
// // returned from the `render` function. Now write it to a file named `team.html` in the
// // `output` folder. You can use the variable `outputPath` above target this location.
// // Hint: you may need to check if the `output` folder exists and create it if it
// // does not.

// // HINT: each employee type (manager, engineer, or intern) has slightly different
// // information; write your code to ask different questions via inquirer depending on
// // employee type.

// // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// // and Intern classes should all extend from a class named Employee; see the directions
// // for further information. Be sure to test out each class and verify it generates an
// // object with the correct structure and methods. This structure will be crucial in order
// // for the provided `render` function to work! ```

 // // After you have your html, you're now ready to create an HTML file using the HTML
// // returned from the `render` function. Now write it to a file named `team.html` in the
// // `output` folder. You can use the variable `outputPath` above target this location.
// // Hint: you may need to check if the `output` folder exists and create it if it
// // does not.