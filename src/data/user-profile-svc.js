export const getMealMoments = function () {
  const ret = {
    bf: {id: 'bf', label: 'Breakfast', order: 0},
    lu: {id: 'lu', label: 'Lunch', order: 1},
    sn: {id: 'sn', label: 'Snack', order: 2},
    di: {id: 'di', label: 'Dinner', order: 3}
  }

  return { then:  function (p) { p(ret)} }
}
