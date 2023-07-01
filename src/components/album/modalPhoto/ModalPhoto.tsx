import { Modal } from 'antd';

interface IModalPhoto {
    isOpen: boolean
    url: string 
    title: string
    setIsopen: (value: boolean) => void
}

export const ModalPhoto = ({ isOpen, url, title, setIsopen }: IModalPhoto) => {
    return (
        <Modal
            open={isOpen}
            footer={null}
            width={`fit-content`}
            onCancel={() => setIsopen(false)}
        >
            <div style={{ width: '100%' }}>
                <img style={{ width: '100%' }} src={url} alt={title} />
            </div>
        </Modal>
    )
}

