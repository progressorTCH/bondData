const dateFilter=function (value) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let str =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    seconds;
  return str;
}
function dataConfig(data) {
  let burnData = data.burns
  let mintData = data.mints
  let swapData = data.swaps
  let finalData = []
  let bondType = ''
  let pairSit = true
  if (burnData.length != 0) {
    console.log(burnData[0].pair.token0.symbol)
    console.log(burnData[0].pair.token1.symbol)
    if (burnData[0].pair.token0.symbol === "DUET") {
      pairSit = true
      bondType = burnData[0].pair.token1.symbol
    } else {
      pairSit = false
      bondType = burnData[0].pair.token0.symbol
    }
  } else if (mintData.length != 0) {
    console.log(mintData[0].pair.token0.symbol)
    console.log(mintData[0].pair.token1.symbol)
    if (mintData[0].pair.token0.symbol === "DUET") {
      pairSit = true
      bondType = mintData[0].pair.token1.symbol
    } else {
      pairSit = false
      bondType = mintData[0].pair.token0.symbol
    }
  } else {
    
    if (swapData[0].pair.token0.symbol === "DUET") {
      pairSit = true
      bondType = swapData[0].pair.token1.symbol
    } else {
      pairSit = false
      bondType = swapData[0].pair.token0.symbol
    }
  }
  burnData.map((v) => {
    let item = {
      action: 'removeLP',
      date: dateFilter(v.timestamp*1000),
      user: v.sender,
      bondType: bondType,
      hash:v.id
    }
    if (pairSit) {
      item.duetAmount = v.amount0
      item.bondAmount = v.amount1
    } else {
      item.duetAmount = v.amount1
      item.bondAmount = v.amount0
    }
    finalData.push(item)
  })
  mintData.map((v) => {
    let item = {
      action: 'addLP',
      date: dateFilter(v.timestamp * 1000),
      user: v.to,
      bondType: bondType,
      hash: v.id
    }
    if (pairSit) {
      item.duetAmount = v.amount0
      item.bondAmount = v.amount1
    } else {
      item.duetAmount = v.amount1
      item.bondAmount = v.amount0
    }
    finalData.push(item)
  })
  swapData.map((v) => {
    let item = {
      date: dateFilter(v.timestamp * 1000),
      user: v.from,
      bondType: bondType,
      hash: v.id
    }
    if (pairSit) {
      console.log(pairSit)
      console.log(swapData[0].pair.token0.symbol)
      console.log(swapData[0].pair.token1.symbol)
      console.log(v.amount0In)
      if (v.amount0In > 0) {
        item.action = 'buy'
        item.duetAmount = v.amount0In
        item.bondAmount = v.amount1Out
      } else { 
        item.action = 'sell'
        item.duetAmount = v.amount0Out
        item.bondAmount = v.amount1In
      }
    } else {
      if (v.amount1In > 0) {
        item.action = 'buy'
        item.duetAmount = v.amount1In
        item.bondAmount = v.amount0Out
      } else {
        item.action = 'sell'
        item.duetAmount = v.amount1Out
        item.bondAmount = v.amount0In
      }
    }
    // console.log(v)
    // console.log(item)
    finalData.push(item)
  })
  return finalData
}
export default dataConfig