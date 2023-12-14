import {Modal } from '@shopify/polaris';
import Upload from './DropZone';
import { useState } from 'react';
import { uploadIcon } from '../../services/service';


export default function UploadModalBox({ activator, handleChange, active, addRow }) {
    const [files, setFiles] = useState([]);

    async function handleUpload(){
        console.log(files)
        const FD = new FormData();
        FD.append("icon",files[0])
        let res = await uploadIcon(FD);
        if(res.status === 200)
        addRow({
        img : res.url,
        name : "custom"
        })
    }


    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Pick your social icon"
            primaryAction={[
                {
                    variant : "primary",
                    tone : "success",
                    content: 'Upload',
                    onAction: handleUpload,
                },
            ]}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
               <Upload files={files} setFiles={setFiles}/>
            </Modal.Section>
        </Modal>

    );
}