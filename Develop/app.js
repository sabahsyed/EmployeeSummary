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
          console.log("Please try again.");
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
          console.log("Please try again.");
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
        const intern = new Intern(response.name,response.email,response.id,response.school);
        team.push(intern);
        addTeamMember();
    })
    .catch(error => {
        if(error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("Please try again.");
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











