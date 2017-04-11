var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/',function(req,res){
res.status(200).end(`
<div style="font-family: Arial,sans-serif;margin: 20px;font-size: 110%;">
<h1>API Basejump: WhoAmI microservice</h1>
<h2>User stories:</h2>
<p>I can get the IP address, language and operating system for my browser.</p>
<p>
Test run at <a href="/whoami" target="_blank" style="background: #f9f2f4;color: #c7254e">`+req.headers.host+`/whoami</a>
</p>
<p>Example output:<br>
<span style="color: lightcoral;margin: 20px;">{"ipaddress":"199.199.199.53","language":"en-US","software":"X11; Ubuntu; Linux i686; rv:31.0"}</span>
</p>
</div>
`);
});

app.get('/whoami',function(req,res){
    var json={};
    json["ipaddress"]=req.headers["x-forwarded-for"];
    json["language"]=req.headers["accept-language"].split(',')[0];
    var software=req.headers["user-agent"].match(/\(([a-z\s;:.0-9])+\)/i)[0];
    json["software"]=software.substring(1,software.length-1);
    res.status(200).end(JSON.stringify(json));
});

app.listen(port, function () {
console.log('App listening on port '+port+"!");
});