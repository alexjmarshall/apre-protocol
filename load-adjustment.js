function adjustedLoad(prevLoad, prevReps, protocolKey, increment = 5) {
  if(!prevLoad || isNaN(prevLoad) || !prevReps || isNaN(prevReps)) return;
  let loadDiff;
  const loadAdjFuncs = [
    (prevLoad) => prevLoad > 200 ? -10 : -5,
    (prevLoad) => prevLoad > 200 ? -10 : -5,
    (prevLoad) => prevLoad,
    (prevLoad) => prevLoad > 200 ? 10 : 5,
    (prevLoad) => prevLoad > 200 ? 15 : 10
  ]
  const range = (start, stop) => {
    const arr = new Array(stop - start + 1)
    for(let i = 0; i < arr.length; i++){
       arr[i] = start++;
    }
    return arr;
  }
  const threeRMRanges = () => [ [1], [2], [3,4], [5,6], range(7,99) ];
  const sixRMRanges = () => [ [1,2], [3,4], range(5,7), range(8,12), range(13,99) ];
  const tenRMRanges = () => [ range(1,6), [7,8], range(9,11), range(12,16), range(17,99) ];
  const fifteenRMRanges = () => [ range(1,9), range(10,12), range(13,17), range(18,24), range(25,99) ];
  const protocols = {
    "3RM": () => new Map(threeRMRanges().map((r,i) => [ r,loadAdjFuncs[i] ])),
    "6RM": () => new Map(sixRMRanges().map((r,i) => [ r,loadAdjFuncs[i] ])),
    "10RM": () => new Map(tenRMRanges().map((r,i) => [ r,loadAdjFuncs[i] ])),
    "15RM": () => new Map(fifteenRMRanges().map((r,i) => [ r,loadAdjFuncs[i] ]))
  };

 const protocol = protocols[protocolKey]();
  for(const range of protocol.keys()) {
    if(range.includes(prevReps)) {
      loadDiff = protocol.get(range)(prevLoad);
      break;
    }
  }

  if(loadDiff % increment) loadDiff = Math.floor(loadDiff / increment) * increment;
  return prevLoad + loadDiff;
}