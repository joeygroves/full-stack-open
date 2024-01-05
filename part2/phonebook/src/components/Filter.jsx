const Filter = ({ searchName, handleSearch, personsToShow }) => {
    return(
      <div>
          filter shown with <input value={searchName} onChange={handleSearch}/>
        </div>
    )
  }

export default Filter;