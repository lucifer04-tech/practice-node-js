const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Submit</button></input></form></body>'
    );
    res.write("</html>");
  }
  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const userName = Buffer.concat(body).toString();
      console.log(userName.split("=")[1]);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body><ul><li>User 1</li></ul></body>");
    res.write("</html>");
  }
});

server.listen(3000, () => console.log("Port is listening on 3000"));
