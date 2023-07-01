import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	return (
		<Menu selectedKeys={[pathname]} mode="horizontal" style={{ justifyContent: 'center' }}>
			<Menu.Item key="/posts" onClick={() => navigate('/posts')}>
				Posts
			</Menu.Item>
			<Menu.Item key="/albums" onClick={() => navigate('/albums')}>
				Albums
			</Menu.Item>
			<Menu.Item key="/todos" onClick={() => navigate('/todos')}>
				Todos
			</Menu.Item>
		</Menu>
	);
};