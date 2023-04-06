import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';

const SearchInput = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`api/v1/product/search/${search.keyword}`);
            setSearch({ ...search, results: data });
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search.keyword}
                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit" style={{margin: '10px'}}>
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
