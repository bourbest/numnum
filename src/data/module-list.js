export const ModuleList = [
  { name: 'appModules.recipeBook', actions:[
    {name: 'manage', target: '/recipes'},
    {name: 'add', target: '/recipes?tab=3'}
  ]},
  { name: 'appModules.mealsPlanning', actions: [
    {name: 'continue', target: '/plan-meals'},
    {name: 'new', target: '/plan-meals/new'},
  ]},
  { name: 'appModules.groceryList', actions: [
    {name: 'new', target: '/grocery'}
  ]}
]
