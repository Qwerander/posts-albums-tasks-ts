import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IShowFavorite {
    setOnlyFavorite: (value: boolean) => void
}

export const ShowFavorite = ({ setOnlyFavorite }: IShowFavorite) => {
    const onChange = (e: CheckboxChangeEvent) => {
        setOnlyFavorite(e.target.checked);
    };
    return (
        <Checkbox onChange={onChange}>Show only favorite</Checkbox>
    )
}

