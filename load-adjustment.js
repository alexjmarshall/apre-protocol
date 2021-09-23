function adjustedLoad(prevLoad, prevReps, protocol, increment = 5) {
  if(!prevLoad || isNaN(prevLoad) || !prevReps || isNaN(prevReps)) return;
  let loadDiff;
  switch(protocol) {
    case "3RM":
      if(prevReps >= 1 && prevReps <= 2)
        loadDiff = prevLoad > 200 ? -10 : -5;
      else if(prevReps >= 3 && prevReps <= 4)
        loadDiff = 0;
      else if(prevReps >= 5 && prevReps <= 6)
        loadDiff = prevLoad > 200 ? 10 : 5;
      else if(prevReps >= 7)
        loadDiff = prevLoad > 200 ? 15 : 10;
      break;
    case "6RM":
      if(prevReps >= 1 && prevReps <= 2)
        loadDiff = prevLoad > 200 ? -10 : -5;
      else if(prevReps >= 3 && prevReps <= 4)
        loadDiff = prevLoad > 200 ? -5 : 0;
      else if(prevReps >= 5 && prevReps <= 7)
        loadDiff = 0;
      else if(prevReps >= 8 && prevReps <= 12)
        loadDiff = prevLoad > 200 ? 10 : 5;
      else if(prevReps >= 13)
        loadDiff = prevLoad > 200 ? 15 : 10;
      break;
    case "10RM":
      if(prevReps >= 4 && prevReps <= 6)
        loadDiff = prevLoad > 200 ? -10 : -5;
      else if(prevReps >= 7 && prevReps <= 8)
        loadDiff = prevLoad > 200 ? -5 : 0;
      else if(prevReps >= 9 && prevReps <= 11)
        loadDiff = 0;
      else if(prevReps >= 12 && prevReps <= 16)
        loadDiff = prevLoad > 200 ? 10 : 5;
      else if(prevReps >= 17)
        loadDiff = prevLoad > 200 ? 15 : 10;
      break;
    case "15RM":
      if(prevReps >= 7 && prevReps <= 9)
        loadDiff = prevLoad > 200 ? -10 : -5;
      else if(prevReps >= 10 && prevReps <= 12)
        loadDiff = prevLoad > 200 ? -5 : 0;
      else if(prevReps >= 13 && prevReps <= 17)
        loadDiff = 0;
      else if(prevReps >= 18 && prevReps <= 24)
        loadDiff = prevLoad > 200 ? 10 : 5;
      else if(prevReps >= 25)
        loadDiff = prevLoad > 200 ? 15 : 10;
      break;
    default:
      return;
  }
  if(loadDiff % increment) loadDiff = Math.floor(loadDiff / increment) * increment;
  return prevLoad + loadDiff;
}