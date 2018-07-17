(()=>{
  let ans = {
    "serviceList":{},
    "laststopList":{},
    "trainList":[]
  }
  let serviceList = []
  let laststopList = []

  let mList = document.getElementsByClassName("m")
  let serviceFlag = false
  let lastStopFlag = false
  for(let i=0;i<mList.length;i++){
    if(serviceFlag){
      let tmp = mList[i].getElementsByTagName("span")
      for(let ii=0;ii<tmp.length;ii++){
        let text = tmp[ii].innerText
        if(tmp[ii].innerText.match(/^\[.+\]\…\[.+\].+$/)){
          ans.serviceList[text.split("…[")[0]] = text.replace(/^\[.+\]\…\[.+\]/,"")
        }else{
          ans.serviceList[text.split("…[")[0]] = text.match(/\…\[.+\]/)[0].replace(/\…\[|\]/gi,"").replace(/\(無料\)/,"")
        }
        serviceList.push(text.split("…[")[0])
      }
      serviceFlag = false
    }
    if(lastStopFlag){
      let tmp = mList[i].innerText.replace(/\s/g,"").split(",")
      for(let ii=0;ii<tmp.length;ii++){
        let text = tmp[ii].split("…")
        ans.laststopList[text[0]] = text[1]
        laststopList.push(text[0])
      }
      lastStopFlag = false
    }
    if(mList[i].innerText.match("車種"))serviceFlag = true
    if(mList[i].innerText.match("行先"))lastStopFlag = true
  }


  const nodeList = document.getElementsByClassName("lowBg01")[0].getElementsByClassName("lowBg06")
  for(let i=0;i<nodeList.length;i++){
    const hour = document.getElementsByClassName("lowBg01")[0].getElementsByClassName("lowBg06")[i].innerText
    const trList = nodeList[i].nextElementSibling.getElementsByTagName("td")
    for(let ii=0;ii<trList.length;ii++){
      if(!!trList[ii].getElementsByTagName("img").length) continue
      let text = trList[ii].innerText

      let service
      if(!trList[ii].getElementsByClassName("s")[0].innerText.match(/\[.+\]/)){
        service = ans.serviceList["無"]
      }else{
        service = ans.serviceList[trList[ii].getElementsByClassName("s")[0].innerText.match(/\[.+\]/)]
      }
      ans.trainList.push({
        "service" : service,
        "laststop" : ans.laststopList[trList[ii].getElementsByClassName("s")[0].innerText.replace(/\[.+\]/g,"")],
        "time" : `${hour}:${text.replace(/^.+\n/,"")}`
      })
    }
  }
  console.log(JSON.stringify(ans.trainList))
})()
