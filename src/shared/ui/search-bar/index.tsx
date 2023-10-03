import { Input } from 'shared'

export const SearchBar = ({ search, searchTable }: any) => {

    return (
        <div style={{marginTop:"10px"}}>
            <Input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e:any) => searchTable(e.target.value)}
            />
        </div>
    )
}