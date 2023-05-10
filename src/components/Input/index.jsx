import { SearchIcon } from "../Icon";

export function Input({
    style,
    className,
    placeholder='Enter a link to scan',
    onChange,
    value,
    type='text',
    onSearch
}) {
    return (
        <span style={{position: 'relative'}}>
            <input 
                type='text'
                className={className}
                style={{
                    border: '1px solid #ECEBED',
                    borderRadius: 6,
                    padding: type == 'search' ? '9px 45px 9px 20px' : '9px 20px',
                    lineHeight: '20px',
                    outline: 'none',
                    ...style
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
            {
                type == 'search' ? (
                    <span style={{position: 'absolute', top: 0, right: 10, cursor: 'pointer'}}
                        onClick={()=> {
                            onSearch && onSearch()
                        }}
                    >
                        <SearchIcon />
                    </span>
                ) : ""
            }
        </span>
    )
}