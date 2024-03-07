const http = require("http");
const client = require("./clientRedis")
const fs = require("fs");
const PORT_SERVER = process.env.PORT_SERVER || 9090;
const server = http.createServer(async (req,res)=>{
        res.setHeader("Content-Type", "application/json");
        let data = null;
        try {
            data = await client.get("cache");        
            if(!data){
                data = fs.readFileSync('file.json', 'utf8');            
                client.set("cache",data);
            }
            res.statusCode = 200;        
            
        } catch(e){
            res.statusCode = 500;        
            data = {"msg":"Server error"};
        }
        res.end(data);
    
});
server.on("error",async (e)=>{
    console.error(e);
    try{
        await client.disconnect();
    }catch(err){
        console.error(err);
    }
    
});
const serverStart = async ()=>{
    
    try{
        await client.connect();
        server.listen(PORT_SERVER)
    }
    catch (e){
        throw e;
    }
}
module.exports.serverStart=serverStart;

