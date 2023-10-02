import React from 'react'
import { useParams } from 'react-router-dom';
import AboutTable from './AboutTable';
import AgregatTable from './AgregatTable';
import { useGetProjectQuery, useGetProjectAgregatsQuery } from 'shared/api/foreignAPI';
import Card from 'shared/ui/Card';

const ProjectCard: React.FC = () => {
    let { id } = useParams();

    const { data: aboutData } = useGetProjectQuery({ id: id }, { pollingInterval: 5000 })
    const { data: agregatData, isLoading, isError, error } = useGetProjectAgregatsQuery({ id: id }, { pollingInterval: 5000 })

    let project = 0;
    if (id) project = parseInt(id)

    if (isLoading) {
        return (
            <Card><p>Загрузка...</p></Card>
        )
    }

    if (isError) {
        return (
            <Card><p>Ошибка</p><br />{error}</Card>
        )
    }

    return (
        <div>
            {project !== 0 && <AboutTable id={project} data={aboutData} />}
            {project !== 0 && <AgregatTable id={project} data={agregatData} />}
        </div>
    )
}

export default ProjectCard