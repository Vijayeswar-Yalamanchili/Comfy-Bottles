import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchBar({ onSearch }) {
    return <>
        <div className="searchField d-flex">
        <input type="text" name="search" className='ps-2' onChange={e => onSearch(e.target.value)} placeholder='Search by product'/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
      </div> 
    </>   
}

export default SearchBar