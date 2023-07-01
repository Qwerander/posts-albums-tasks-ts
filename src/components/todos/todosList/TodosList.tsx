import { useEffect, useState } from "react";
import { Button, List } from 'antd';
import { Task } from "../task/Task";
import { ModalConfirum } from "../../share/modalConfirum/ModalConfirum";
import { fetchDeleteTodo } from "../api/store/fetchMethods";
import { TodosType } from "../api/apiTypes";
import { useAppDispatch } from "../../../store/hooks";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface ITodosList {
    todos: TodosType
}

interface ICheckedItems {
    [value: number]: boolean
}

export const TodosList = ({ todos }: ITodosList) => {
    const dispatch = useAppDispatch();
    const [pageSize, setPageSize] = useState<number>(10)
    const [checkedItems, setCheckedItems] = useState<ICheckedItems>({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showButtonAction = Object.values(checkedItems).some(value => value === true);
    // console.log(todos);
    
    const onChange = (itemId: number) => (e: CheckboxChangeEvent) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem('checkedTodos')!)
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
        const pageSizeFromStorage = localStorage.getItem('todosPageSize')
        if (pageSizeFromStorage) {
            setPageSize(+pageSizeFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todosPageSize', pageSize.toString())
        localStorage.setItem('checkedTodos', JSON.stringify(checkedItems))
    }, [checkedItems, pageSize])

    const filtredId = Object.keys(checkedItems).filter(key => checkedItems[+key] === true)

    const deleteConfirum = () => {
        filtredId.forEach(id => {
            dispatch(fetchDeleteTodo(+id))
        })
        setCheckedItems({})
    }

    return (
        <>
            <List
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>Todos</h1>}
                itemLayout="vertical"
                size="small"
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100", "200"]
                }}
                dataSource={todos}
                renderItem={(task) => (
                    <Task
                        task={task}
                        checked={checkedItems[task.id]}
                        onChange={onChange}
                    />
                )}
            />
            {showButtonAction &&
                <>
                    <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
                        Delete
                    </Button>

                    <ModalConfirum
                        confirum={deleteConfirum}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                </>
            }
        </>
    )
}



