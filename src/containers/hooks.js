import {useState, useEffect, useMemo} from 'react'
import {filter} from 'lodash'
import {compareStrings} from '../data/string_utils'

export function useDebounce (value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export function useFilter (list, filterValue, property = 'name') {
  return useMemo( () => {
    const filteredList = filter(list, item => {
      const name = (item[property] || '').substring(0, filterValue.length)
      return compareStrings(filterValue, name) === 0
    })
    filteredList.sort((l, r) => compareStrings(l[property], r[property])) 
    return filteredList
  }, [list, filterValue, property])
}