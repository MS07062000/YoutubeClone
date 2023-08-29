import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper,Box, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
        }
    }
    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                width:{xs:'72vw', md:'50vw'}
            }}
            
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <input
                    className="search-bar"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <IconButton
                    type="submit"
                    sx={{ p: '10px', color: 'red' }} aria-label='search'>
                    <Search />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default SearchBar;