import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'shared';
import { useGetProjectsQuery } from 'shared/api/foreignAPI';


export const ProjectMenu: React.FC = () => {

  const { data } = useGetProjectsQuery('')

  return (
    <Card header='Проекты'>
      {data && data.map((proj: any) => (
        <Link to={"/tasks/project/" + proj.id} key={proj.id}>{proj.projectType + " №" + proj.projectNumber}</Link>
      ))}
    </Card>
  )
}

