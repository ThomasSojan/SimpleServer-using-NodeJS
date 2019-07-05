const http = require ('http');
const path = require ('path');
const fs = require ('fs');

//Hosting diff files



const server = http.createServer((req,res) =>{

     // Build file path
     let filePath = path.join (
            __dirname,
            'public',
            req.url === '/' ? 'home.html' : req.url
     );
    
     // File extension

     let extname = path.extname(filePath);

     // Initial content type

     let contentType = 'text/html';

     //Check ext and set content type

     switch (extname) {

       case ".js" :
              contentType =  'text/javascript';
              break;

        case ".css" :
              contentType =  'text/css';
              break;

      case ".json" :
              contentType =  'application/json';
              break;

      case ".png" :
              contentType =  'image/png';
              break;

      case ".jpg" :
              contentType =  'image/jpg';
              break;

     }

     // Check if contentType is text/html but no .html file extension
     //?
  if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  console.log(filePath);


     // Read File

     fs.readFile(filePath, (err,content) =>{

         if(err){

              if(err.code == 'ENOENT'){
                     
                //Page not found

                fs.readFile(path.join(__dirname,'public','404.html'),
                (err,content) =>{
                     res.writeHead(200,{'Content-Type': 'text/html'});
                     res.end(content,'utf8');

                });

              } else{
                     //Some server error
                     res.writeHead(500);
                     res.end(`Server Error:${error.code}`);

              }

       }  else {

              //Success
              res.writeHead(200,{'Content-Type': contentType});
              res.end(content,'utf8');
       }     
                
      });
      
     });
              
         
     
//For deploying use  const PORT = process.env.port

const PORT = process.env.PORT || 5000;

server.listen(PORT,() =>console.log(`server running on ${PORT}`));