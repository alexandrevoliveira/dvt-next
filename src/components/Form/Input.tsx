import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, error = null, ...rest }: InputProps, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name} color="white">{label}</FormLabel>}

        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="purple.dvt-mid"
          color="black"
          bgColor="white"
          variant="outline"
          _hover={{
            bgColor: 'white.bg'
          }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {!!error && (
          <FormErrorMessage>
            { error.message }
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase)