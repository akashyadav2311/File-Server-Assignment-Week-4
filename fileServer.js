/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    
    app.get('/file/:filename',function(req,res){
        const name = req.params.filename
        
        const FilePath = path.join(__dirname,'./files/',name)
        fs.readFile(FilePath,'utf-8',function (error,data){
            if(error){
                console.log('file cannot read'+error)
                return res.status(404).send('File not found');
            }else{
                res.send(data);
            }
        })
    });

    app.get('/files',function(req,res){
        
        const directoryPath = path.join(__dirname,'files')
        fs.readdir(directoryPath,function (error,files){
            if(error){
                console.log(error)
                res.status(500).send('Unable to read files directory'+error)
            }else{
                console.log(files);
                var array = [];
                files.forEach(file => {
                    array.push(file);
                });
                
                res.json(array);
            }
        })
    })

    app.get('*',function(req,res){
        res.status(404).send('Route not found');
    })
    app.listen(3000);
    
    module.exports = app;
   