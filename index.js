var readlineSync = require("readline-sync");
var chalk = require("chalk");
var fetch = require("node-fetch");

// const Database = require("@replit/database")
// const db = new Database()

// console.clear();
console.log(chalk.hex('#fff200')(`

░██████╗░██╗░░░██╗██╗███████╗
██╔═══██╗██║░░░██║██║╚════██║
██║██╗██║██║░░░██║██║░░███╔═╝
╚██████╔╝██║░░░██║██║██╔══╝░░
░╚═██╔═╝░╚██████╔╝██║███████╗
░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝
`)+chalk.yellow("🟡 🟡 🟡  Ⓐ ⓥ ⓔ ⓝ ⓖ ⓔ ⓡ ⓢ 🟡 🟡 🟡\n\n"));
var name = readlineSync.question(chalk.hex('#1B9CFC').bold("Hi, what's your name?\n"));
console.clear()
console.log(chalk.green.bold("Hi, "+name+ " let's see how well do you know me...\n\n"));
var points = 0, count = 0;
function ask(question,ans){
  count++;
  console.log("\n\n"+chalk.hex('#fff200').bold(points+" ☢\n"));
  var answer = readlineSync.question(chalk.hex('#1B9CFC').bold(question+" ")+chalk.hex('#57606f').bold("(Hint: Begins with '")+chalk.hex('#ced6e0').bold(ans.substring(0,1).toUpperCase())+chalk.hex('#57606f').bold("')\n")+chalk.hex('#1B9CFC').bold("=> "));
  
  console.log();
  

  if(answer.toLowerCase()===ans){
    points++;
    console.log(chalk.green.bold(answer+" ✓"));
  }
  else{
    console.log(chalk.red.bold(answer+" ✘"));}
  
  if(count==5){
    if(points >= 3){
      console.log(chalk.green.bold("\n🏆\tCongrats, "+name+" you scored "+points+" points.\n"));
      
      
      
    }
    else{

      
      console.log(chalk.red.bold("\nOops, "+name+" you scored "+points+" points. Try again to score better.\n"));

    }
  var data = {"name": name, "points": points, "user_type": "mq"};
  // console.log(JSON.stringify(data));
  fetch("https://quiz-score.herokuapp.com/save_user", {
    method: "POST", 
    body: JSON.stringify(data)
  }).then(response => response.json()).then(function leaderboard(json){
    var colors = ['#f1c40f','#ecf0f1','#e77f67','#f78fb3','#3dc1d3'];
    console.log(chalk.hex('#c44569').bold("\nYour Rank: "+json.rank));
    console.log(chalk.hex('#596275').bold("\n------------------------"));
    console.log(chalk.yellow.bold("\n------Leader Board------\n"));
    for(var i=0;i<json.data.length;i++){
      var nameLen = json.data[i].name.length;
      var username = json.data[i].name
      if (nameLen > 17){
        username = username.substring(0,14)+"...";
        nameLen = 17;
      }
      // console.log(nameLen,name,nameLen>17);
      var noOfSpaces = 20 - nameLen;
      console.log(chalk.hex(colors[i]).bold((i+1)+'. '+username+" ".repeat(noOfSpaces)+json.data[i].points));
    }
    console.log(chalk.hex('#596275').bold("\n------------------------\n"));
  });

  }
  else{
    
    readlineSync.question(chalk.hex('#1B9CFC').bold("\nPress Enter to continue...\n"));
    console.clear();
  }
  
}
questions = [
  {
    "question":"Where was the Power Stone before Thanos got his hands on it?",
    "answer":"xandar"
  },
  {
    "question":"Where did Thor settle down with the rest of the Asgardians after the initial snap?",
    "answer":"norway"
  },
  {
    "question":"In Ant-Man and the Wasp, Scott Lang enters Quantum Realm to gather what?",
    "answer":"healing energies"
  },
  {
    "question":"As Janet, Hope Van Dyne and Hank Pym disintegrated due to the Snap, Ant-Man was stranded in another dimension. What is the name of the dimension?",
    "answer":"quantum realm"
  },
  {
    "question":"At the end of Doctor Strange, the titular character uses the Time Stone to trap a villain in a time loop. Who is the villain?",
    "answer":"Dormammu"
  },
  {
    "question":"Right before Thanos reaches Wakanda in Infinity War, which stone does he collect?",
    "answer":"time stone"
  },
  {
    "question":"What is Thors new weapon called?",
    "answer":"stormbreaker"
  },
  {
    "question":"There were two Infinity stones in play during the first Avengers movie. One was the the space stone, in the tesseract. What was the other?",
    "answer":"mind stone"
  }
]
var arr = new Array(questions.length).fill(0);
// var repIndexes = []
for(var i = 0;i<5;i++){
  var z = 0;
  for(var j = 0;j<questions.length;j++){
    z = Math.floor((Math.random() * 8));
    if(arr[z]==0){
      arr[z]++;
      // console.log("z = "+z+" "+arr[z]);
      break;
    }
  }
  
  // for(var j = 0;j<questions.length;j++){
  //   console.log(arr[j]);
  // }
  // console.log("\n");
  
  ask(questions[z].question,questions[z].answer);
}

// var name = readlineSync.question();
// console.log(chalk.red.bold("Hi, "));