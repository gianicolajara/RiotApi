export const utilsLocalStorage = {
  verifyItemAndCreateLocalStorage: async (itemName, item, getItem, setItem) => {
    if (!localStorage.getItem(itemName)) {
      await getItem()
      localStorage.setItem(itemName, JSON.stringify(item()))
    } else {
      setItem(JSON.parse(localStorage.getItem(itemName)))
    }
  },
}
