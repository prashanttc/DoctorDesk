import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUpladerProps = {
    files: File[],
    onChange: (files: File[]) => void
}
const FileUploader = ({ files, onChange }: FileUpladerProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files.length > 0 ? <>
                <Image height={1000} width={1000} alt='upload-img' src={convertFileToUrl(files[0])} className='max-h-[480px]' />
            </> : <>
                <Image src='/assets/icons/upload.svg' height={40} width={40} alt='default img' />
                <div className='file-upload_label'>
                    <p className='text-14-regular'>
                        <span className='text-green-500'>Click to upload</span>
                        or drag and drop file here
                    </p>
                    <p>SVG,PNG,DOC,PDF</p>
                </div>
            </>
            }
        </div>
    )
}
export default FileUploader;