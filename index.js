const express = require('express')
const app = express()
const port = 8888
const webshot = require('webshot');
var os = require("os");
var ifaces = os.networkInterfaces();
let ipAdd = '';

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
  
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
        ipAdd = iface.address;
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        ipAdd = iface.address;

      }
      ++alias;
    });
  });

app.use(express.static('images'))

app.get('/url/:url', function (req, res) {
    let filename =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    webshot(req.params.url, `./images/${filename}.png`, function(err) {
         if (err){

         }
         res.send(`${ipAdd}:${port}/${filename}.png`)
      });
  })

app.listen(port, () => console.log(`listening on port ${port}`))
