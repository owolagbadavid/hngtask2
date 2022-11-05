const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


app.post('/', body('x').trim()
          .isLength({ min: 1 }),
         body('y').trim()
          .isLength({ min: 1 }),
         body('operation_type').trim()
          .isLength({ min: 1 }),
         (req, res) => {
const error = validationResult(req);
        if(!error.isEmpty()){
          return res.json({ error: 'Required field(s) missing'           })
        }

           
  let result;
let {operation_type, x, y} = req.body;
console.log(operation_type, x, y)
  
operation_type = operation_type.toLowerCase();
x = Number(x)
y = Number(y)  
let operators = ['addition','add','plus', 'sum','subtraction','minus','subtract','multiplication','times','product', '+', '-', '*', 'difference', 'subtracting', 'sub', 'subtracted', 'mult','multiplying','multiplied', 'adding', 'added', 'summation', 'totalling', 'summing', 'counting', 'count', 'tallying', 'decrease', 'decrement', 'decrementing', 'reduce', 'reduced', 'reduction', 'increase', 'increment', 'incrementing', 'increased', 'reducing', 'increasing']
           

let test = operation_type.split(' ')
           for(let i = 0; i<operators.length; i++){
             if(test.includes(operators[i])){
              operation_type = operators[i]
               break;
             }
             else if(i == operators.length-1){
               if(/\+|\*|-/.test(operation_type)){

                 operation_type = operation_type.match(/\+|\*|-/)[0]
                 
               }else{
               return res.json({error: "invalid operator"}) }
             }
             else{continue;}
           }
           
switch(operation_type){
    case "addition":
    case "add":
    case "plus":
    case "+":
    case "adding":
    case "counting":
    case "summation":
    case "summing":
    case "tallying":
    case "totalling":
    case "increment":
    case "incrementing":
    case "increased":
    case "increase":
    case "increasing":
    case "count":
    operation_type = "addition";
    result = x + y;
    break;
    case "subtraction":
    case "subtract":
    case "minus":
    case "-":
    case "difference":
    case "sub":
    case "subtracting":
    case "subtracted":
    case "reducing":
    case "reduce":
    case "reduction":
    case "decrease":
    case "decrement":
    case "decreasing":
    case "decreased":
    operation_type = "subtraction";
    result = x - y;
    break;
    case "product":
    case "multiplication":
    case "times":
    case "multiply":
    case "*":
    case "multiplied":
    case "multiplying":
    case "mult":
    operation_type = "multiplication";
    result = x * y;
    break;
  default:
    return res.json({error: "invalid operator"})
}
  
  console.log(operation_type, x, y)
  
return res.json({slackUsername:"oreosinnit",  result, operation_type});
});

app.listen(3000, () => {
  console.log('server started');
});
