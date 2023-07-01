import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchPatchPost, fetchPostPost } from '../api/store/fetchMethods';
import { IPostForRecive } from '../api/apiTypes';

interface IEditForm {
    id?: number
    title?: string
    body?: string
    author?: string
    close: (value: boolean) => void
}

interface IValues {
    title: string
    body: string 
    author: number 
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const EditForm = ({ id, title = '', body = '', author = '', close }: IEditForm) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.posts.users)
    const [form] = Form.useForm();

    const handleFinish = (values: IValues) => {
        const data: IPostForRecive = {
            body: values.body,
            title: values.title,
            userId: values.author
        }
        if (id) {
            dispatch(fetchPatchPost({ id, data }))
        } else {
            dispatch(fetchPostPost({...data}));
        }
        form.resetFields();
        close(false);
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleFinish}
            style={{ maxWidth: '100%' }}
            initialValues={{ title, body, author }}
        >
            <Form.Item name="title" label="Title" >
                <Input />
            </Form.Item>
            <Form.Item name="body" label="Text">
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
                <Button type="default" onClick={() => close(false)}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

