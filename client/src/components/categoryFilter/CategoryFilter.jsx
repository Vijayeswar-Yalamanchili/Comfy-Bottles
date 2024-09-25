function CategoryFilter({ onFilter }) {

  const categories = ['All', 'Stainless-steel', 'Bronze', 'Temperature-converter','Sports-Confy'];
    
  return <>
    <select onChange={e => onFilter(e.target.value)}>
      {
        categories.map(category => (
          <option key={category} value={category === 'All' ? '' : category}>
            {category}
          </option>
        ))
      }
    </select>
  </>
}

export default CategoryFilter