import { List } from 'antd';
import { IComment } from '../api/apiTypes';

interface ICommentsList {
    comments: Array<IComment>
}

export const CommentsList = ({ comments }: ICommentsList) => {

    return (
        <List
            header={<h3 style={{ textAlign: 'center' }}>Комментарии</h3>}
            itemLayout="vertical"
            size="small"
            dataSource={comments}
            renderItem={(item) => (
                <List.Item
                    style={{ textAlign: 'left' }}
                    key={item.id}
                >
                    <List.Item.Meta
                        title={`${item.name}, ${item.email}`}
                    />
                    <p>{item.body}</p>
                </List.Item>
            )}
        />
    )
}



