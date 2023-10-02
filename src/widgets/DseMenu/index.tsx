import React from 'react'
import { Link } from 'react-router-dom';
import { useGetDsesQuery } from 'shared/api/foreignAPI';
import Card from 'shared/ui/Card';


const DseMenu: React.FC = () => {
  const { data } = useGetDsesQuery('')

  return (
    <Card header='ДСЕ'>
      {data && data.map((proj: any) => (
        <Link to={"/tasks/agregat/dse/" + proj.id} key={proj.id}>{proj.dseCode + " " + proj.name}</Link>
      ))}
    </Card>
  )
}

export default DseMenu