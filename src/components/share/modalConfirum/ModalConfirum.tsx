import { Modal } from 'antd';
import { LegacyButtonType } from 'antd/es/button/button';

interface IModalConfirum {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    confirum: () => void
    okType?: LegacyButtonType
    okText?: string
}

export const ModalConfirum = ({ isOpen, setIsOpen, confirum, okType = 'danger', okText = 'Delete' }: IModalConfirum) => {
    const handleComfirum = () => {
        confirum()
        setIsOpen(false)
    }
    return (
        <Modal
            title="Are you sure?"
            open={isOpen}
            onOk={handleComfirum}
            okType={okType}
            onCancel={() => setIsOpen(false)}
            okText={okText}
            cancelText="Cancel"
        >
        </Modal>
    );
};
