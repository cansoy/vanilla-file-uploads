const express=require("express")
const server=express()
const cors =require("cors")
const colors =require("colors")
const fs =require("fs")

server.set("etag",false)
server.use(cors())

server.use(express.raw({ type: 'application/octet-stream', limit: '100mb' }));
server.use(express.urlencoded({extended:true}))

server.post("/file",(req,res)=>{
  const buffer =req.body
  console.log(buffer)
  console.log("buffer.toString()".bgRed)
  fs.writeFile("./test.png",buffer,(err)=>{
    if (err) {
        return console.log(err?.message)
        console.log("okey".bgGreen)
    }
  })
  res.json({file:"file"})
})

server.post("/text",(req,res)=>{
    const body =req.body
    console.log(body)
    res.json({text:"text"})
})

server.post("/combine",(req,res)=>{
    const arrChunks =[]

    req.on("data",(chunk)=>{
        arrChunks.push(chunk)
    })

    req.on("end",()=>{
        const concatChunks =Buffer.concat(arrChunks)
        console.log(concatChunks.toString("binary"))

        res.json({text:"combine"})
    })
})


server.listen(3000,()=>{
    console.log("-------------------------------------------------")
})
