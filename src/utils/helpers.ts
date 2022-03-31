export const shapeCSVLines = (array: string[][]) => {
    const object = {}
    array.forEach((row, rowIndex) => {
      rowIndex === 0 ? 
        array[rowIndex].forEach((column) => {
          Object.assign(object, {
            ...object,
            [column]: [] as string[]
          })
        })
      : array[rowIndex].forEach((column, columnIndex) => object[`${array[0][columnIndex]}`].push(column))
    })
  
    return object
  }
