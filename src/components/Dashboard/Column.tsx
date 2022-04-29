import { Box, Stack, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic';
import { useState } from "react";
import { CustomObjectSelect } from "../Select/CustomObjectSelect";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

interface ObjectProps<T> {
  [key: string]: T;
}

interface DashboardProps{
  name?: string;
  object?: ObjectProps<any>;
}

export default function ColumnDashboard({ name, object }: DashboardProps) {
  const [row, setRow] = useState<string>()
  const [column, setColumn] = useState<string>()
    
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: object[row] ? object[row] : [[1], [2], [3], [4], [5]],
      labels: {
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: row,
        style: {
          fontSize: "12px",
          fontWeight: "bold"
        }
      }
    },
    yaxis: {
      title: {
        text: column,
        style: {
          fontSize: "12px",
          fontWeight: "bold"
        },
      },
    },
  };
  
  const series = [
    { name: name, data: object[column] ? object[column] : [1, 2, 3, 4, 5]},
  ];

  return (
    <Stack flex="1" direction={["column"]} spacing={["2", "4"]} align="center">
      <Box
        w={["80vw", "100%"]}
        h="100%"
        p={["6", "8"]}
        bg="white.bg"
        borderRadius="8"
        pb="4"
        height="fit-content"
      >
        <Text fontSize="lg" mb="4" color="purple.dvt-dark">{name}</Text>
        <Chart options={options} series={series} type="bar" />
      </Box>

      <Stack direction={["row"]} align="center" spacing={[4, 16]}>
        <CustomObjectSelect
          title="Row"
          placeholder="Row"
          value={row}
          items={Object.keys(object)}
          onChange={newValue => setRow(newValue)}
        />
        <CustomObjectSelect
          title="Column"
          placeholder="Column"
          value={column}
          items={Object.keys(object)}
          onChange={newValue => setColumn(newValue)}
        />
      </Stack>
    </Stack>
  )
}