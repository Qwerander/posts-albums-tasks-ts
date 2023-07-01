import styles from './task.module.css'
import { List, Checkbox } from 'antd';
import { ReactComponent as DeleteSvg } from '../../../img/delete.svg'
import { ReactComponent as EditSvg } from '../../../img/edit.svg'
import { useState } from 'react';
import { ModalConfirum } from '../../share/modalConfirum/ModalConfirum';
import { EditForm } from '../editForm/EditForm';
import { fetchDeleteTodo, fetchPatchTodo } from '../api/store/fetchMethods';
import { ITodo } from '../api/apiTypes';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch } from '../../../store/hooks';

interface ITask {
    task: ITodo
    checked: boolean
    onChange: (itemId: number) => (e: CheckboxChangeEvent ) => void
  }

export const Task = ({ task, checked, onChange }: ITask) => {
    const dispatch = useAppDispatch();

    const [isEditMode, toggleIEditMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const deleteConfirum = () => {
        dispatch(fetchDeleteTodo(task.id))
    }


    const handleCompleted = (taskId: number) => (e: CheckboxChangeEvent) => {
        const data = {
            completed: e.target.checked
        }
        dispatch(fetchPatchTodo({ id: taskId, data }))
    };

    return (
        <>
            <List.Item
                className={styles.item}
                key={task.id}

            >
                {isEditMode ?
                    <EditForm
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        close={toggleIEditMode}
                    />
                    : <div className={styles.task}>
                        <p className={task.completed ? styles.done : ''}>
                            {task.id}. {task.title}
                        </p>
                        <div className={styles.actions}>
                            <EditSvg onClick={() => toggleIEditMode(prev => !prev)} style={isEditMode ? { fill: '#1677ff' } : {fill: ''}} />
                            <DeleteSvg onClick={() => setIsModalOpen(true)} />
                            <div className={styles.checkboxes}>
                                <Checkbox
                                    checked={checked}
                                    onChange={(e) => onChange(task.id)(e)}
                                >
                                    Checked
                                </Checkbox>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={(e) => handleCompleted(task.id)(e)}
                                >
                                    Completed
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                }
            </List.Item>
            <ModalConfirum
                confirum={deleteConfirum}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </>
    )
}
