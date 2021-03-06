let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use( express.static('data'))
//设置允许跨域访问该服务器
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
})

// // /get地址请求
app.get('/Classification',(req,res)=>{
   let data =require('./data/Classification.json')
    res.send(data);
})
app.get('/homeHot',(req,res)=>{
    let data =require('./data/homeHot.json')
     res.send(data);
 })
 app.get('/homelist',(req,res)=>{
    let data =require('./data/homelist.json')
     res.send(data);
 })
 app.get('/subscreen',(req,res)=>{
    let data =require('./data/subscreen.json')
     res.send(data);
 })
 app.get('/bijiben',(req,res)=>{
    let data =require('./data/Goodslist/bijiben.json')
     res.send(data);
 })
 app.get('/yitiji',(req,res)=>{
    let data =require('./data/Goodslist/yitiji.json')
     res.send(data);
 })
 app.get('/taishiji',(req,res)=>{
    let data =require('./data/Goodslist/taishiji.json')
     res.send(data);
 })
 app.get('/zhuji',(req,res)=>{
    let data =require('./data/Goodslist/zhuji.json')
     res.send(data);
 })
 app.get('/work',(req,res)=>{
    let data =require('./data/Goodslist/work.json')
     res.send(data);
 })
 app.get('/xianshiqi',(req,res)=>{
    let data =require('./data/Goodslist/xianshiqi.json')
     res.send(data);
 })
 app.get('/dayingji',(req,res)=>{
    let data =require('./data/Goodslist/dayingji.json')
     res.send(data);
 })
 app.get('/touyinyi',(req,res)=>{
    let data =require('./data/Goodslist/touyinyi.json')
     res.send(data);
 })
 app.get('/pinban',(req,res)=>{
    let data =require('./data/Goodslist/pinban.json')
     res.send(data);
 })
 app.get('/phone',(req,res)=>{
    let data =require('./data/Goodslist/phone.json')
     res.send(data);
 })
 app.get('/peijian',(req,res)=>{
    let data =require('./data/Goodslist/peijian.json')
     res.send(data);
 })
 app.get('/wuyoufuwu',(req,res)=>{
    let data =require('./data/Goodslist/wuyoufuwu.json')
     res.send(data);
 })
 app.get('/azsj',(req,res)=>{
    let data =require('./data/Goodslist/anzhuangshengji.json')
     res.send(data);
 })
 app.get('/whby',(req,res)=>{
    let data =require('./data/Goodslist/weihubaoyang.json')
     res.send(data);
 })
 app.get('/wlbs',(req,res)=>{
    let data =require('./data/Goodslist/wangluobushu.json')
     res.send(data);
 })
 app.get('/office',(req,res)=>{
    let data =require('./data/Goodslist/office.json')
     res.send(data);
 })
 app.get('/121171',(req,res)=>{
    let data =require('./data/Goodsdetail/121171.json')
     res.send(data);
 })
 app.get('/115892',(req,res)=>{
    let data =require('./data/Goodsdetail/115892.json')
     res.send(data);
 })
 app.get('/124713',(req,res)=>{
    let data =require('./data/Goodsdetail/124713.json')
     res.send(data);
 })
 app.get('/129682',(req,res)=>{
    let data =require('./data/Goodsdetail/129682.json')
     res.send(data);
 })
 app.get('/130022',(req,res)=>{
    let data =require('./data/Goodsdetail/130022.json')
     res.send(data);
 })
 app.get('/111494',(req,res)=>{
    let data =require('./data/Goodsdetail/111494.json')
     res.send(data);
 })
 app.get('/113374',(req,res)=>{
    let data =require('./data/Goodsdetail/113374.json')
     res.send(data);
 })
 app.get('/114145',(req,res)=>{
    let data =require('./data/Goodsdetail/114145.json')
     res.send(data);
 })
 app.get('/116367',(req,res)=>{
    let data =require('./data/Goodsdetail/116367.json')
     res.send(data);
 })
 app.get('/116922',(req,res)=>{
    let data =require('./data/Goodsdetail/116922.json')
     res.send(data);
 })
 app.get('/118932',(req,res)=>{
    let data =require('./data/Goodsdetail/118932.json')
     res.send(data);
 })
 app.get('/120992',(req,res)=>{
    let data =require('./data/Goodsdetail/120992.json')
     res.send(data);
 })
 app.get('/127158',(req,res)=>{
    let data =require('./data/Goodsdetail/127158.json')
     res.send(data);
 })
 app.get('/129560',(req,res)=>{
    let data =require('./data/Goodsdetail/129560.json')
     res.send(data);
 })
 app.get('/129853',(req,res)=>{
    let data =require('./data/Goodsdetail/129853.json')
     res.send(data);
 })
 app.get('/131144',(req,res)=>{
    let data =require('./data/Goodsdetail/131144.json')
     res.send(data);
 })


// app.use(bodyParser.urlencoded({extended:false}))
// //返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// // /post地址请求
// app.post('/post',(req,res)=>{
//     let json = JSON.stringify({
//         "result":parseInt(req.body.a)-parseInt(req.body.b),
//     })
//     console.log(req.body)
//     res.send(json);
// })


app.listen(8000,()=>{
    console.log('访问成功')
})