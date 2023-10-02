import React from 'react'
import { Link } from 'react-router-dom';
import { useGetAgregatsQuery } from 'shared/api/foreignAPI';
import Card from 'shared/ui/Card';


const AgregatMenu: React.FC = () => {

  const { data } = useGetAgregatsQuery('')

  return (
      <Card header='Агрегаты'>
        {data && data.map((proj: any) => (
          <Link to={"/tasks/agregat/" + proj.id} key={proj.id}>{proj.dseCode + " " + proj.name}</Link>
        ))}
      </Card>
  )
}

export default AgregatMenu