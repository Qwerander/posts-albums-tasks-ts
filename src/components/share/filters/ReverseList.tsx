import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IReverseList {
    setReversList: (value: boolean) => void
}

export const ReverseList = ({ setReversList }: IReverseList) => {
    const onChange = (e: CheckboxChangeEvent) => {
        setReversList(e.target.checked);
    };
    return (
        <Checkbox onChange={onChange}>Reverse list</Checkbox>
    )
}

