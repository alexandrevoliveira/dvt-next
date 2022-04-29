import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

interface SelectProps {
  title?: string;
  placeholder?: string;
  value: string;
  items: string[];
  onChange: (newValue: string) => void;
}

export function CustomObjectSelect({ title, placeholder, value, items, onChange}: SelectProps) {
  return(
    <Stack>
      {title && (
        <Text fontWeight="normal" fontSize={[20, 22]} color="gray.50">
          {title}
        </Text>
      )}
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
          {items?.find(item => item === value) || placeholder || "Choose your variable..."}
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
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Stack>
  )
}