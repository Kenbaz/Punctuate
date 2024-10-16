import { FC, ChangeEvent } from "react";

interface FileUploadProps {
    onFileRead: (content: string) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileRead }) => {
    const handFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile) {
            const read = new FileReader();
            read.onload = (e) => {
                const content = e.target?.result as string;
                onFileRead(content);
            }
            read.readAsText(selectedFile)
        }
    };

    return (
        <div>
            <input className="bg-slate-400 hidden" id="file-upload" type="file" accept=".txt, .docx" onChange={handFileChange} />
            <label className="text-slate-900 cursor-pointer hover:underline" htmlFor="file-upload">Upload</label>
        </div>
    );
};

export default FileUpload;