// Import the http module to create an HTTP server
const http = require('http')
// Import the fs module to read files from the file system
const fs = require('fs')
// Define the port number the server will listen on
const port = 8080

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Check if the request URL is the root URL
    if (req.url === '/'){
        // Read the index.html file
        fs.readFile('pages/index.html', (err, data) => {
            if(!err)
                // Write the file data to the response
                res.write(data)
            else
                // Write the error to the response if there is an error
                res.write(err)
            // End the response
            res.end()
        })
    }
    // Check if the request URL is /admin
    else if (req.url === '/admin'){
        // Read the admin.html file
        fs.readFile('pages/admin.html', (err, data) => {
            if(!err)
                // Write the file data to the response
                res.write(data)
            else
                // Write the error to the response if there is an error
                res.write(err)
            // End the response
            res.end()
        })
    }
    // Check if the request URL is /student
    else if (req.url === '/student'){
        // Read the student.html file
        fs.readFile('pages/student.html', (err, data) => {
            if(!err)
                // Write the file data to the response
                res.write(data)
            else
                // Write the error to the response if there is an error
                res.write(err)
            // End the response
            res.end()
        })
    }
    // Check if the request URL is /data
    else if (req.url === '/data'){
        // Write a JSON response
        res.write(JSON.stringify({ message : "Hello world JSON"}))
        // End the response
        res.end()
    }
    // Handle any other request URLs
    else{
        // End the response with an invalid request message
        res.end('Invalid Request!')
    }
})

// Start the server and listen on the specified port
server.listen(port, () => {
    // Log a message to the console when the server is running
    console.log('Node.js web server at port ' + port + ' is running')
})