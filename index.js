const express = require('express')
const app = express()
const port = 8888
const webshot = require('webshot');
var os = require("os");
var hostname = os.hostname();


app.use(express.static('images'))

app.get('/url/:url', function (req, res) {
    let filename =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    webshot(req.params.url, `./images/${filename}.png`, function(err) {
         if (err){

         }
         res.send(`${hostname}/images/${filename}.png`)
      });
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
