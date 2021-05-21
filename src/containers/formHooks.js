
const getElement = function (event) {
  return event.currentTarget
  /*let el = event.target
  while (el && !el.name) { el = el.parentElement}
  return el*/
}

const incrementField = function (form, event, onFormUpdated) {
  const el = getElement(event)
  const newForm = {...form}
  newForm[el.name] += parseInt(el.value)
  onFormUpdated(newForm)
}

// returns a generic int field incrementator
export function useIncrementField (form, onFormUpdated) {
  return function (event) {
    incrementField(form, event, onFormUpdated)
  }
}

const updateField = function (form, event, onFormUpdated) {
  const el = getElement(event)
  const fieldName = el.name
  const newForm = {...form}
  newForm[fieldName] = el.value
  onFormUpdated(newForm)
}
export function useUpdateField (form, onFormUpdated) {
  return function (event) { 
    updateField(form, event, onFormUpdated)
  }
}

const fieldToggler = function (form, event, onFormUpdated) {
  const el = getElement(event)
  const fieldName = el.name
  const newForm = {...form}
  newForm[fieldName] = !newForm[fieldName]
  onFormUpdated(newForm)
}
export function useFieldToggler (form, onFormUpdated) {
  return function (event) {
    fieldToggler(form, event, onFormUpdated)
  }
}
