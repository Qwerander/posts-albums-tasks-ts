import { useEffect, useState } from "react";
import { Button, Layout, RadioChangeEvent, Space } from "antd";
import { TodosList } from "../../components/todos/todosList/TodosList";
import { AddNewTask } from "../../components/todos/modal/AddNewTask";
import { Filters } from "../../components/todos/filters/Filters";
import { fetchGetTodos } from "../../components/todos/api/store/fetchMethods";
import { displayedList } from "../../components/share/displayedList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const TodosPage = () => {
	const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>('');
    const [reversList, setReversList] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [sortType, setSortType] = useState<number>(1);
	const { todos } = useAppSelector(state => state.todos)

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	const onSortChange = (e: RadioChangeEvent) => {
		setSortType(e.target.value);
	};

	const filteredList = todos.filter(task => {
		const isTitleMatched = task.title.toLowerCase().includes(searchValue.toLowerCase());
		return isTitleMatched
	});

	useEffect(() => {
		if (!todos?.length) {
			dispatch(fetchGetTodos());
		}
	}, [dispatch, todos]);

	return (
		<Layout>
			<Space direction="vertical" style={{ marginBottom: '12px', padding: '50px 25px 50px' }}>
				<Button type="primary" onClick={() => setIsModalOpen(true)}>
					+ Add new task
				</Button>
				<Filters
					onSearch={handleSearchChange}
					setReversList={setReversList}
					onSortChange={onSortChange}
					sortType={sortType}
				/>
				<TodosList
					todos={displayedList({list: filteredList, sortType, reversList})}
				/>
			</Space>
			<AddNewTask
				isOpen={isModalOpen}
				setIsopen={setIsModalOpen}
			/>
		</Layout>

	)
}

