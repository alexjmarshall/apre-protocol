function adjustedLoad (prevLoad, prevReps, routineKey, increment=10) {
  if ( prevLoad === '' || prevReps === '' ) {
    return prevLoad;
  }

  const routines = {
    "3RM": [10,7,5,3,2],
    "6RM": [13,10,8,5,3],
    "10RM": [18,15,13,9,7],
    "15RM": [25,21,18,13,10],
  };

  const routine = routines[routineKey];

  if (!routine) {
    return prevLoad;
  }

  let incFactor = 3;

  for (const repTarget of routine) {
    if (prevReps >= repTarget) {
      const adjLoad = prevLoad + (increment * incFactor);
      return adjLoad;
    }
    incFactor--;
  }

  const adjLoad = prevLoad + (increment * incFactor);
  return adjLoad;
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