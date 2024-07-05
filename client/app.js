const formfile =document.querySelector("#formfile")
const formtext =document.querySelector("#formtext")
const combineform =document.querySelector("#combine")
const combineinput=document.querySelector("#combineinput")
const inputFile =document.querySelector("#file")
let buffer =null

inputFile.addEventListener("input",(e)=>{
    const file =e.target.files[0]
    const {name,size,type}=file

    const filereader=new FileReader()
    filereader.readAsArrayBuffer(file)
    filereader.onload=(e)=>{
        const result =e.target.result
        buffer=result
    }
})

formfile.addEventListener("submit",(e)=>{
    e.preventDefault()

    const formdata =new FormData(formfile)
    for (const [key,value] of formdata.entries()) {
        console.log(key,value)
    }
    formdata.append("buffer",buffer)
    fetch("http://127.0.0.1:3000/file",{
        method:"post",
        headers:{
            "content-type":"application/octet-stream"
        },
        body:buffer
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

formtext.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formdata =new FormData(formtext)

    fetch("http://127.0.0.1:3000/text",{
        method:"post",
        headers:{
            "content-type":"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams(formdata)
    })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
        })
})


combineinput.addEventListener("input",(e)=>{
    const file =e.target.files[0]
    const filereader=new FileReader()
    filereader.readAsArrayBuffer(file)
    filereader.onload=(e)=>{
        const result =e.target.result
        buffer=null
        buffer=result
    }
})

combineform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formdata =new FormData(combineform)
    const blob=new Blob([buffer],{type:"application/octet-stream"})
    console.log(blob)
    formdata.append("arraybufferfile",blob,"file-buffer")

    fetch("http://127.0.0.1:3000/combine",{
        method:"post",
        body:formdata
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })

})