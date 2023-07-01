import { Input } from 'antd';
import { ChangeEvent } from 'react';

const { Search } = Input;

interface ISearchTitle {
    onSearch: (value: string) => void
}

export const SearchTitle = ({ onSearch }: ISearchTitle) => {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    return (
        <Search placeholder="Search by title" onChange={handleSearchChange} style={{ width: '100%' }} />
    )
}

