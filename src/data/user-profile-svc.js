export const getMealMoments = function () {
  const ret = [
    {id: 'bf', label: 'Breakfast'},
    {id: 'lu', label: 'Lunch'},
    {id: 'di', label: 'Diner'},
    {id: 'sn', label: 'Snack'},
  ]
  return { then:  function (p) { p(ret)} }
}
