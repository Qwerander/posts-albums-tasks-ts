import { RadioChangeEvent, Space } from 'antd';
import { SearchTitle } from '../../share/filters/SearchTitle';
import { ReverseList } from '../../share/filters/ReverseList';
import { SortGroup } from '../../share/filters/SortGroup';

interface IFilters {
    onSearch: (value: string) => void;
    setReversList: (value: boolean) => void;
    onSortChange: (value: RadioChangeEvent) => void;
    sortType: number;
}

export const Filters = ({ onSortChange, onSearch, sortType, setReversList  }: IFilters) => {
    return (
        <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
            <SearchTitle onSearch={onSearch} />
            <Space style={{ marginRight: 16 }}>
                <ReverseList setReversList={setReversList} />
                <SortGroup
                    onSortChange={onSortChange}
                    sortType={sortType}
                />
            </Space>
        </Space>
    )
}

