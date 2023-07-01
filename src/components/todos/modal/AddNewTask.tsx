import { Modal } from 'antd';
import { EditForm } from '../editForm/EditForm';

interface IAddNewTask {
    isOpen: boolean
    setIsopen: (value: boolean) => void
}

export const AddNewTask = ({ isOpen, setIsopen }: IAddNewTask) => {

    return (
        <Modal
            title="Add new task"
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
