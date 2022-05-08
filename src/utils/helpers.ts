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
    // here i start by filtering which columns will be worked on 
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
    
    // here i create a new column named 'ingresso_evasao_total'
    Object.assign(object, {
      ...object,
      ['ingresso_evasao_total']: []
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
          && (ing_ev_tot[2] !== null)
          && (Number(ing_ev_tot[0]) < Number(ing_ev_tot[1]))
        ) {
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

    // here the dropout rate will be calculated according to the number of
    // students who entered during that period of time
    const ing_ev_tot_result = ing_ev_tot_reduced.map((iet: any[]): any[] => {
      const entry_period: string = iet[0]
      const semester_dropout: string = iet[1]
      const students_dropout_amount: number = iet[2]

      // as required the number of students who entered per semester is equal 50
      const number_of_students_entered_per_period = 50

      let entry_period_as_number = 0
      let semester_dropout_as_number = 0

      // if the period is the 2nd of the year we add .8 otherwise .4 since the
      // other period would be the 1st. This happens to get the correct 
      // difference between periods
      entry_period.includes(".2") ?
        entry_period_as_number = Number(entry_period) + 0.8
        : entry_period_as_number = Number(entry_period) + 0.4
      
      semester_dropout.includes(".2") ?
        semester_dropout_as_number = Number(semester_dropout) + 0.8
        : semester_dropout_as_number = Number(semester_dropout) + 0.4

      const evasion_time_in_periods = (semester_dropout_as_number - entry_period_as_number) * 2
      const total_number_of_students_entered = evasion_time_in_periods * number_of_students_entered_per_period
      
      if (students_dropout_amount > total_number_of_students_entered) {
        return null
      } else {
        const evasion_rate = students_dropout_amount / total_number_of_students_entered
        return [entry_period, semester_dropout, evasion_rate]
      }
    })

    // removing undefined values and sorting the array by the 1st column and then by the 2nd column
    const ing_ev_tot_sorted = ing_ev_tot_result.filter(value => {
      if (value !== undefined) {
        return value
      } else return
    }).sort((a,b) => b[2] - a[2])
        
    return {
      ['ingresso_evasao']: ing_ev_tot_sorted.map((value: any[]) => `${value[0]}-${value[1]}`),
      ['taxa_evasao']: ing_ev_tot_sorted.map((value: any[]) => Number(`${value[2]}`)),
    }
  }
