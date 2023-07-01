import { Radio, RadioChangeEvent } from 'antd';
import { useLocation } from 'react-router-dom';

interface ISortGroup {
    onSortChange: (value: RadioChangeEvent) => void
    sortType: number
}

export const SortGroup = ({ onSortChange, sortType }: ISortGroup) => {
    const { pathname } = useLocation()
    // console.log(sortType); 
    
    return (
        <Radio.Group onChange={onSortChange} value={sortType}>
            {pathname === '/todos' &&
                <>
                    <Radio value={1}>Not completed first</Radio>
                    <Radio value={2}>Completed first</Radio>
                </>
            }
            <Radio value={3}>By ID</Radio>
            <Radio value={4}>By title</Radio>
        </Radio.Group>
    )
}
