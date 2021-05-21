const createRecipeMethods = [
  { name: 'recipeCreationMethods.blank', actions: [{name: 'action', target: '/recipes/new'}]},
  { name: 'recipeCreationMethods.url', actions: [{name: 'action', target: '/recipes/import-from-url'}]},
  { name: 'recipeCreationMethods.photo', actions: [{name: 'action', icon: 'camera', target: '/recipes/take-picture'}]},
  { name: 'recipeCreationMethods.picture', actions: [{name: 'action', icon: 'picture', target: '/recipes/import-from-picture'}]}
]

export default createRecipeMethods