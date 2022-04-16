import { Autocomplete, Button, Checkbox, InputLabel, MenuItem, Popover, Select, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { City } from 'country-state-city';
import { useState, useEffect } from "react";
import './search.scss';
import { categories } from "../../models/filters";
import { ProfessionalsList } from "./professionals-list/professionals-list";
import store from "../../store";
import { getAllProfessionals } from "../../services/user.service";
export function Search() {
    const [gender, setGender] = useState('Male');
    const [category, setCategory] = useState(categories[0]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [searchFor, setSearchFor] = useState('Professional')
    const [searchInput, setSearchInput] = useState('');
    const [professionalsData, setProfessionalsData] = useState([]);
    const [searchResults, setSearchResuts] = useState([]);
    const user = store.getState().userDetails;
    useEffect(() => {
        getProfessionals();

    }, [])


    async function getProfessionals() {
        const { data } = await getAllProfessionals();
        setProfessionalsData(data);
        setSearchResuts(data);
    }

    const filterSearchResults = (input) => {
        if(!input) {
            setSearchResuts(professionalsData);
            return;
        }
        const results = professionalsData.filter(data=>{
            const name = `${data.first_name} ${data.last_name}`
            return name.includes(searchInput)
        });

        setSearchResuts(results);
    }


    const useCustomStylesByIds = () => {
        const myStyles = makeStyles((theme) => {
            const stylesObj = {
                'search-for-filters': {
                    display: 'flex'
                },
                'search-by-filters': {
                    display: 'flex',
                    height: '100px'
                },
                'filter': {
                    margin: '20px'
                }
            };
            return stylesObj;
        });

        return myStyles();
    };
    const [anchorEl, setAnchorEl] = useState(null)

    const classes = useCustomStylesByIds();
    return (
        <div className="search-container">
            <div className="search-header" style={{ marginBottom: '30px', display: 'flex', fontWeight: 'bold' }}>Explore Fitness Professionals.</div>
            {user.user_type === 'Customer' && <div className="search-filters" style={{ display: 'flex', marginBottom: '30px' }}>
                <Button id='filters-button' variant="text" startIcon={<FilterAltIcon />} onClick={(e) => { setAnchorEl(e.currentTarget); setFiltersOpen(!filtersOpen) }}>
                    Filters
                </Button>
                <Popover
                    open={filtersOpen}
                    anchorEl={anchorEl}
                    classes={{ paper: "MuiPopover-paper" }}
                    onClose={() => { setFiltersOpen(false); setAnchorEl(null) }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div className={classes['search-for-filters']}>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Search For</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={searchFor}
                                label="Search For"
                                onChange={(e) => setSearchFor(e.target.value)}
                            >

                                <MenuItem value='Professional'>Professional</MenuItem>
                                <MenuItem value='Content'>Content</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes['search-by-filters']}>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Categories</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                            </Select>
                        </div>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Instructor</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Instructor"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </div>
                        {/* <div className={classes['filter']}>
                        <CheckboxesTags/>
                        </div> */}
                    </div>
                </Popover>

            </div>}
            <div className="search-input">
                <TextField sx={{ width: '500px' }} onChange={(e) => { setSearchInput(e.target.value); filterSearchResults(e.target.value) }} placeholder="Search" size="small"></TextField>
            </div>

            <div className="professionals-list" style={{ marginTop: '2em' }}>
                {searchResults.length && <ProfessionalsList professionalsData={searchResults} />}
            </div>
        </div>
    )
}

export function CheckboxesTags() {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const cities = (City.getCitiesOfCountry('US')).slice(0, 1000);
    return (
        <>
            <label htmlFor="checkboxes" style={{ fontSize: '14px' }}>Location</label>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                limitTags={2}
                options={cities}
                size="small"
                disableCloseOnSelect
                getOptionLabel={(option) => `${option.name}, ${option.stateCode}`}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                sx={{ width: '350px' }}
                renderInput={(params) => (
                    <TextField {...params} />
                )}

            />
        </>
    );
}