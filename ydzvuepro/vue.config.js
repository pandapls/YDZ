module.exports = {
	devServer:{
		port:8080,
		host:'localhost',
		https:false,
		proxy:{
			"/api":{
				target:"http://utf8.api.smschinese.cn",
				changeOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}
