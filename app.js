let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let server = http.createServer(function (req, res) {
    if (req.url === "/reg") {
        if (req.method === "GET") {
            let fileContent = fs.readFileSync("./html/reg.html");
            res.end(fileContent);
        } else if (req.method === "POST") {
            let body = "";

            req.on("data", data => {
                body += data;
            })

            req.on("end", () => {
                let student = qs.parse(body);
                fs.readFile("students.txt", "utf8", (error, data) => {
                    if (error) {
                        console.error(error);
                    } else {
                        let array = JSON.parse(data);
                        array.push(student);

                        fs.writeFileSync("students.txt", JSON.stringify(array));
                        res.end("Student registered");
                    }
                });
            })
        }
    } else if (req.url === "/login") {
        if (req.method === "GET") {
            let fileContent = fs.readFileSync("./html/auth.html");
            res.end(fileContent);
        } else if (req.method === "POST") {
            let body = "";

            req.on("data", data => {
                body += data;
            })

            req.on("end", () => {
                let student = qs.parse(body);
                fs.readFile("students.txt", "utf8", (error, data) => {
                    if (error) {
                        console.error(error);
                    } else {
                        let array = JSON.parse(data);

                        let studentFound = false;

                        for (let i = 0; i < array.length; i++) {
                            if (array[i].fullname === student.fullname && array[i].group === student.group) {
                                studentFound = true;
                                break;
                            }
                        }
                        if (studentFound) {
                            res.end("OK!");
                        } else {
                            res.end("Student not found!");
                        }
                    }
                });
            })
        }
    }
});

const PORT = process.argv[2];
server.listen(PORT);