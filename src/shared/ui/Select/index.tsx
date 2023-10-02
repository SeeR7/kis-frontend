

const Select = ( {onChange, children, data}:any) => {
    return (
        <select className='select' defaultValue={children} onChange={onChange} >
            {data && data.map((item:any) => 
                <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </select>
    )
}

export default Select