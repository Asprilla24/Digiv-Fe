// server.js
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.mode === 'development'  });
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 8081;
const bodyParser = require("body-parser");
const compression = require('compression')
const cookieParser = require('cookie-parser')
const Cookies = require('js-cookie')

const axios = require('axios').default
require('dotenv').config()


// With express
const express = require("express");
app.prepare().then(() => {
	const server = express();
	server.use(compression())
	server.use(cookieParser())
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	// server.get("/espush", postLogEs)
	server.get("/health", (req, res) => {
		res.json({ name: "digivapp.fe", healthy: true });
	});
	
	// server.post("/auth/login",(req,res,next)=> {
	// 	axios.post(`${process.env.API_URL}api/auth/login`,{
	// 		email : req.body.email,
	// 		password : req.body.password
	// 	}).then((response)=> {
	// 		const {data : {data,status_code}} = response
	// 		if(status_code == 200){
	// 			Cookies.set('ATT',data.access_token)
	// 			Cookies.set('ART',data.refresh_token)
	// 			Cookies.set('AEU',data.email)
	// 			Cookies.set('AID',data.user_id)
	// 			return res.status(200).json({status:"ok",status_code:200})
	// 		}	
	// 		return res.status(200).json({status:"asdasd",status_code:200})
	
	// 	}).catch((error)=> {
	// 		console.log(JSON.stringify(error))

	// 		return res.status(500).json({error:true,message:"error occured,please try again"})

	// 	})
	// })
	server.get("*", (req, res) => {
		return handler(req, res, req.params);
	});
	
	server.use(handler).listen(PORT, (err) => {
		if (err) {
			console.error(err);
			throw err;
		}
		console.log(`> Ready on http://localhost:${PORT}`);
	});


	//   express().use(handler).listen(8081)
});
