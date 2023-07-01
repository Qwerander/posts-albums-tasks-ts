import { Modal } from 'antd';

import { EditForm } from '../editForm/EditForm';

interface IAddNewPost {
    isOpen: boolean
    setIsopen: (value: boolean) => void
}

export const AddNewPost = ({ isOpen, setIsopen }: IAddNewPost) => {

    return (
        <Modal
            title="Add new post"
            open={isOpen}
            footer={null}
            onCancel={() => setIsopen(false)}
        >
            <EditForm
                close={setIsopen}
            />
        </Modal>
    );
};
