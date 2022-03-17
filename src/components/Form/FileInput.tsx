import { Button, Icon } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { RiFileUploadFill } from "react-icons/ri"

export interface FileInputProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}

export const FileInput =
  ({ label, onChange, uploadFileName, acceptedFileTypes, allowMultipleFiles}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <Button
        type="button"
        onClick={onClickHandler}
        color="white"
        bgColor="purple.dvt-mid"        
        borderColor="white"
        borderWidth={1}
        _hover={{
          bgColor: "purple.dvt-dark",
          borderColor: "white.800"
        }}
        rightIcon={<Icon as={RiFileUploadFill} fontSize={24}/>}
      >
        {label}
      </Button>
      <input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </form>
  );
};

FileInput.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};
