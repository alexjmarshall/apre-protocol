function adjustedLoad(prevLoad, prevReps, routineKey, increment=5) {

  let loadDiff;
  const loadAdj = (high, low) => {

    return (prevLoad) => prevLoad > 200 ? high : low;
  }
  const none = () => 0;

  const routines = {
    "3RM": [
      [1, loadAdj(-10, -5)],
      [2, loadAdj(-5, 0)],
      [4, none],
      [6, loadAdj(10, 5)],
      [99, loadAdj(15, 10)]
    ],
    "6RM": [
      [2, loadAdj(-15, -10)],
      [4, loadAdj(-10, -5)],
      [7, none],
      [12, loadAdj(10, 5)],
      [99, loadAdj(15, 10)]
    ],
    "10RM": [
      [6, loadAdj(-10, -5)],
      [8, loadAdj(-5, 0)],
      [11, none],
      [16, loadAdj(10, 5)],
      [99, loadAdj(15, 10)]
    ],
    "15RM": [
      [9, loadAdj(-10, -5)],
      [12, loadAdj(-5, 0)],
      [16, none],
      [24, loadAdj(10, 5)],
      [99, loadAdj(15, 10)]
    ],
  }

  const routine = routines[routineKey];

  for(const maxAndAdj of routine) {
    if(prevReps <= maxAndAdj[0]) {
      loadDiff = maxAndAdj[1](prevLoad);
      break;
    }
  }

  if (loadDiff % increment) loadDiff = Math.floor(loadDiff / increment) * increment;
  const adjustLoad = prevLoad + loadDiff;

  return adjustLoad;
}


function exertionLoad(load, reps, rir=0) {

  let xl = 0;

  for(let i = 1; i <= reps; i++) {
    xl += load*Math.pow(2.71828, -0.215 * (reps + rir - i));
  }

  return Math.round(xl);
}


function epley1RM(load, reps) {
  
  return Math.round(load * (1 + reps / 30));
}