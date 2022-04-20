export const shapeCSVLines = (array: string[][]) => {
    const object = {}
    array.forEach((row, rowIndex) => {
      rowIndex === 0 ? 
        array[rowIndex].forEach((column) => {
          Object.assign(object, {
            ...object,
            [column.replace(/\s/g, "_").toLowerCase()]: [] as string[]
          })
        })
      : array[rowIndex].forEach((column, columnIndex) => {
        typeof(column) !== 'string' ?
          object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]?.push('')
          : object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]?.push(column)
      })
    })
  
    return object
  }
