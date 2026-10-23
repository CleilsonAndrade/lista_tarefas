export function loadList(storage) {
  const storedList = storage.getItem('Lista')

  if (!storedList) {
    return []
  }

  try {
    const parsedList = JSON.parse(storedList)
    return Array.isArray(parsedList) ? parsedList : []
  } catch {
    return []
  }
}
