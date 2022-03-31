import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

interface FileProps {
  name: string;
  rows: string[][];
}

interface SelectProps {
  placeholder?: string;
  value: FileProps,
  items: FileProps[],
  onChange: (newValue: FileProps) => void;
}

export function CustomCSVSelect({ placeholder, value, items, onChange}: SelectProps) {
  return(
    <Menu>
      <MenuButton
        letterSpacing=".7px"
        color="white"
        bgColor="purple.dvt-dark"
        p={2}
        borderRadius={4}
        borderWidth={1}
        borderColor="white"
        as={Button}
        rightIcon={<Icon as={MdArrowDropDown} fontSize={24}/>}
        _active={{
          bgColor: "purple.dvt-dark"
        }}
        _hover={{
          bgColor: "purple.dvt-dark"
        }}
      >
        {items?.find(item => item?.name === value?.name)?.name || placeholder || "Choose your .csv file..."}
      </MenuButton>
      <MenuList
        color="white"
        bgColor="purple.dvt-mid"
        letterSpacing=".7px"
      >
        {items?.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => onChange(item)}
            _active={{
              bgColor: "purple.dvt-dark"
            }}
            _hover={{
              bgColor: "purple.dvt-dark"
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}