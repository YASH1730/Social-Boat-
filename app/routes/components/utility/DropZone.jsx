import {DropZone, LegacyStack, Thumbnail, Text} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export default function Upload({files,setFiles}) {


  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/svg'];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .svg size (144*144)" />
  );

  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  return (
    <DropZone  allowMultiple={false} onDrop={handleDropZoneDrop} variableHeight  accept="image/svg+xml">
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}