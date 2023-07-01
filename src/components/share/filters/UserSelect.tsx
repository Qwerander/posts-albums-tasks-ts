import { Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { IUser } from '../../posts/api/apiTypes';

interface UsersTypeelect {
  onChangeUser: (value: number[]) => void;
  users: IUser[];
}

export const UserSelect = ({ onChangeUser, users }: UsersTypeelect) => {
  const options = users.map((user: IUser) => ({
    value: user.id,
    label: user.name
  }));

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={'blue'}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      style={{
        width: '100%',
      }}
      options={options}
      onChange={onChangeUser}
      placeholder="Search by author"
    />
  );
};





