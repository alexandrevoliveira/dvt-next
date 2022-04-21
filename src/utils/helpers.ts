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

  export const shapeEvasionCSVLines = (array: string[][]) => {
    const object = {}
    const evasionColumns = ['período_ingresso', 'semestre_da_evasão', 'número_de_evadidos_por_turma']
    array.forEach((row, rowIndex) => {
      rowIndex === 0 ? 
        array[rowIndex].forEach((column) => {
          if(column) {
            evasionColumns.includes(column.replace(/\s/g, "_").toLowerCase()) ?
              Object.assign(object, {
                ...object,
                [column.replace(/\s/g, "_").toLowerCase()]: [] as string[]
              }) : null;
          } else{            
            Object.assign(object, {
              ...object,
              ['ingresso_evasao_total']: []
            })
          }
        })
      : array[rowIndex].forEach((column, columnIndex) => {
        if (object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]){
          if (typeof(column) !== 'string') {
            object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]?.push('')
          } else {
            object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]?.push(column)
          }
        } else {
          return null;
        }
      })
    })

    const ing_ev_tot_array = object['ingresso_evasao_total'] as any[]

    Object.keys(object).forEach((key, index) => {
      if (index === 0) {
        Object.keys(object[key]).forEach(value => {
          const ing_ev_tot_data = []
          ing_ev_tot_data.push(object[key][value])
          ing_ev_tot_array.push(ing_ev_tot_data)
        })
      }
      if (index > 0 && index < 3) {
        Object.keys(object[key]).forEach(value => {
          const ing_ev_tot_data = []
          ing_ev_tot_data.push(object[key][value])
          ing_ev_tot_array[value].push(object[key][value])
        })
      }
    })
  
    return object
  }
