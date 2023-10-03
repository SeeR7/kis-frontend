import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'shared';
import { useGetDsesQuery } from 'shared/api/foreignAPI';


export const DseMenu: React.FC = () => {
  const { data } = useGetDsesQuery('')

  return (
    <Card header='ДСЕ'>
      {data && data.map((proj: any) => (
        <Link to={"/tasks/agregat/dse/" + proj.id} key={proj.id}>{proj.dseCode + " " + proj.name}</Link>
      ))}
    </Card>
  )
}

