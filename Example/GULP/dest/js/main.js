module.exports=function(e,l){e.get("/",function(e,s){var n=e.session;s.render("index",{title:"MY HOMEPAGE",length:5,name:n.name,username:n.username})}),e.get("/list",function(e,n){l.readFile(__dirname+"/../data/user.json","utf8",function(e,s){console.log(__dirname),console.log(s),n.end(s)})}),e.get("/getUser/:username",function(o,r){l.readFile(__dirname+"/../data/user.json","utf8",function(e,s){var n=JSON.parse(s);r.json(n[o.params.username])})}),e.post("/addUser/:username",function(o,r){var a={},u=o.params.username;if(console.log("userName --\x3e"+u),null==o.body.password||null==o.body.name)return console.log("check req validty !"),a.success=0,a.error="invalid request",void r.json(a);l.readFile(__dirname+"/../data/user.json","utf8",function(e,s){var n=JSON.parse(s);if(console.log("users[username] : "+n[u]),null!=n[u])return console.log("load data & check duplication"),a.success=0,a.error="duplicate",void r.json(a);n[u]=o.body,console.log(o.body),l.writeFile(__dirname+"/../data/user.json",JSON.stringify(n,null,"\t"),"utf8",function(e,s){console.log("Save Data"),a={success:1},r.json(a)})})}),e.delete("/delete/:username",function(o,r){var a={};l.readFile(__dirname+"/../data/user.json","utf8",function(e,s){var n=JSON.parse(s);if(null==n[o.params.username])return a.success=0,a.error="not found",void r.json(a);delete n[o.params.username],l.writeFile(__dirname+"/../data/user.json",JSON.stringify(n,null,"\t"),"utf8",function(e,s){a.success=1,r.json(a)})})}),e.get("/login/:username/:password",function(u,t){var i;console.log("Logtin process START !"),i=u.session,l.readFile(__dirname+"/../data/user.json","utf8",function(e,s){var n=JSON.parse(s),o=u.params.username,r=u.params.password,a={};if(null==n[o])return a.success=0,a.error="not found",void t.json(a);r==n[o].password?(a.success=1,i.username=o,i.name=n[o].name):(a.sucess=0,a.error="incorrect"),t.json(a)})}),e.get("/logout",function(e,s){console.log("logout START!"),sess=e.session,console.log(sess.username),null!=sess.username?sess.destroy(function(e){e?console.log(e):s.redirect("/")}):s.redirect("/")})};