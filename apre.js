function adjustedLoad(prevLoad=0, prevReps=10, routineKey="10RM", increment=5) {

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


function exertionLoad(load=0, reps=0, rir=0) {

  let xl = 0;

  for(let i = 1; i <= reps; i++) {
    xl += load*Math.pow(2.71828, -0.215 * (reps + rir - i));
  }

  return Math.round(xl);
}


function epley1RM(load=0, reps=0) {
  
  return Math.round(load * (1 + reps / 30));
}

function loadAdj(prevLoad, prevRepsArr=[[]], type='MJ', increment=5) {
  prevRepsArr = prevRepsArr[0];
  type = String(type).toUpperCase();
  const validTypes = ['MJ', 'SJ'];

  if ( prevLoad === '' || prevRepsArr.every(v => v === '')  || !validTypes.includes(type) ) {
    return prevLoad;
  }

  const repTargets = {
    'MJ': {
      min: 6,
      max: 10
    },
    'SJ': {
      min: 8,
      max: 15
    }
  };

  const maxReps = repTargets[type].max;
  const minReps = repTargets[type].min;
  const newLoad = prevRepsArr.some(v => v < minReps) ? prevLoad - increment :
                  prevRepsArr.some(v => v >= maxReps) ? prevLoad + increment :
                  prevLoad;

  return newLoad;
}