const fs = require('fs')

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-type', 'text/html')
        res.write(`<html>`)
        res.write(`<head>`)
        res.write(`<title>Enter Message</title>`)
        res.write(`</head>`)
        res.write(`<body>`)
        res.write(`<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form>`)
        res.write(`</body>`)
        res.write(`</html`)
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {

            body.push(chunk)
            console.log(body)
        })

        return req.on('end', () => {
            // Buffer collect the body bt concat and convert to string
            const parsedBody = Buffer.concat(body).toString();

            // Split to array and take the text after =
            const message = parsedBody.split('=')[1]

            fs.writeFile('message.txt', message, () => {
                console.log(message)

                // redirect
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }

    res.setHeader('Content-type', 'text/html')
    res.write(`<html>`)
    res.write(`<head>`)
    res.write(`<title>Home page</title>`)
    res.write(`</head>`)
    res.write(`<body>`)
    res.write(`<h1>This is home page</h1>`)
    res.write(`</body>`)
    res.write(`</html`)
    res.end()
}

// muitple ways to exports

module.exports = requestHandler

// module.exports = {
//     handler : requestHandler,
// }

// module.exports.handler = requestHandler

// exports.handler = requestHandler