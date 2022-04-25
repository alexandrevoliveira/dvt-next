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
        const column_name = object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]
        typeof(column) !== 'string' ?
          column_name?.push('')
          : column_name?.push(column)
      })
    })
  
    return object
  }

  export const shapeEvasionCSVLines = (array: string[][]) => {
    const object = {}
    const evasionColumns = ['período_ingresso', 'semestre_da_evasão', 'número_de_evadidos_por_turma']
    // here i start by filtering which columns will be worked on, and also 
    // create a new column named 'ingresso_evasao_total'
    array.forEach((row, rowIndex) => {
      rowIndex === 0 ? 
        array[rowIndex].forEach((column) => {
          if(column) {
            const column_name = column.replace(/\s/g, "_").toLowerCase()
            evasionColumns.includes(column_name) ?
              Object.assign(object, {
                ...object,
                [column_name]: [] as string[]
              }) : null;
          } else{            
            Object.assign(object, {
              ...object,
              ['ingresso_evasao_total']: []
            })
          }
        })
      : array[rowIndex].forEach((column, columnIndex) => {
        const column_name = object[`${array[0][columnIndex]}`.replace(/\s/g, "_").toLowerCase()]
        if (column_name){
          if (typeof(column) !== 'string') {
            column_name?.push('')
          } else {
            column_name?.push(column)
          }
        } else {
          return null;
        }
      })
    })

    const ing_ev_tot_array = object['ingresso_evasao_total'] as any[]

    // here i walk through each element of the original columns that is necessary
    // to be worked on and toss them together to the new column 
    Object.keys(object).forEach((key, index) => {
      if (index === 0) {
        Object.keys(object[key]).forEach(value => {
          const ing_ev_tot_data = []
          ing_ev_tot_data.push(object[key][value]);
          ing_ev_tot_array.push(ing_ev_tot_data);
        })
      }
      if (index === 1) {
        Object.keys(object[key]).forEach(value => {
          ing_ev_tot_array[value].push(object[key][value]);
        })
      }
      if (index === 2) {
        Object.keys(object[key]).forEach(value => {
          const total = object[key][value] as string;
          // in case total string has any character other than a digit,
          // a null value will be sent to the array, else the value will be sent
          // as a number
          if (Boolean(total.match(/(\D)|(^$)/g))) {
            ing_ev_tot_array[value].push(null)
          } else {
            ing_ev_tot_array[value].push(Number(total));
          }
        })
      }
    })

    // here the 'ingresso_evasao_total' column will have each repeated value of 
    // index 0 and 1 combined, reduced with the 2nd index summed
    const ing_ev_tot_reduced: any[] = 
      ing_ev_tot_array.reduce((ing_ev_tot_filtered: any[], ing_ev_tot: any[]) => {
        if (((ing_ev_tot[0] && ing_ev_tot[1]) !== '' || undefined)
          && (ing_ev_tot[2] !== null  && ing_ev_tot[2] < 300)) {
          const found = ing_ev_tot_filtered.some(iet => iet[0] === ing_ev_tot[0] && iet[1] === ing_ev_tot[1])
  
          if (!found) {
            ing_ev_tot_filtered.push(ing_ev_tot)
          } else {
            const foundElement = ing_ev_tot_filtered.find(iet => iet[0] === ing_ev_tot[0] && iet[1] === ing_ev_tot[1])
            foundElement[2] += ing_ev_tot[2]
          }
  
          return ing_ev_tot_filtered
        } else {
          return ing_ev_tot_filtered
        }
      }, [])

    // sorting the array by the 1st column and then by the 2nd column
    const ing_ev_tot_sorted = ing_ev_tot_reduced.sort().sort((a,b) => a[1] - b[1])
        
    return {
      ['ingresso_evasao']: ing_ev_tot_sorted.map((value: any[]) => `${value[0]}-${value[1]}`),
      ['total']: ing_ev_tot_sorted.map((value: any[]) => Number(`${value[2]}`)),
    }
  }
