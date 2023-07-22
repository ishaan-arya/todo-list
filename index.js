import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var taskNameList = [];
var taskList = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {list: taskList});
});

app.post("/submit", (req, res) => {
    if (req.body.task && taskNameList.indexOf(req.body.task)==-1) {
        taskList.push(`<form action="/complete" class="item-card right-left-green" method = "POST">
        ${req.body.task}
        <button class="checkbox" name="taskName" value="${req.body.task}">
          <span class="material-symbols-outlined" formmethod="post"> done_outline </span>
        </button>
      </form>`);
      taskNameList.push(req.body.task);
        res.render("index.ejs", {
           list: taskList,
        });
    };
});

app.post("/complete", (req, res) => {
    for (var i = 0; i < taskNameList.length; i++) {
        if (taskNameList[i] === req.body.taskName) {
            taskList[i] = `<form action="/delete" class="item-card right-left-red" method = "POST">
            <s>${req.body.taskName}</s>
            <button class="checkbox delete" name="taskName" value="${req.body.taskName}">
                <span class="material-symbols-outlined" formmethod="post">delete</span>
            </button>
            </form>`;
        };
    };
    res.render("index.ejs", {
        list: taskList,
    });
});

app.post("/delete", (req, res) => {
    for (var i = 0; i < taskNameList.length; i++) {
        if (taskNameList[i] === req.body.taskName) {
            taskList.splice(i, 1);
            taskNameList.splice(i, 1);
        };
    };
    res.render("index.ejs", {
        list: taskList,
    });
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});