import { Button, Form, Input, Select } from 'antd';
import { fetchPatchAlbum } from '../api/store/fetchMethods';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface IEditForm {
    id: number
    title: string
    author: string
    close: (value: boolean) => void
}

interface IValues {
    title: string
    author: number 
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const EditForm = ({ id, title, author, close }: IEditForm) => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.albums.users)
    const [form] = Form.useForm();

    const onFinish = (values: IValues) => {
        const { author, ...rest } = values;
        dispatch(fetchPatchAlbum({ id, data: { ...rest, userId: Number(author) } }))
        close(false)
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            initialValues={{ title, author }}
        >
            <Form.Item name="title" label="Title" >
                <Input />
            </Form.Item>
            <Form.Item name="author" label="Author">
                <Select>
                    {users.map(user => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button htmlType="button" onClick={() => close(false)}>
                    Don't save
                </Button>
            </Form.Item>
        </Form>
    );
};

