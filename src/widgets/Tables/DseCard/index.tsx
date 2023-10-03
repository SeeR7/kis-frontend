import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from 'shared/api/userAPI';
import {Card} from 'shared';
import DseTable from './DseTable';
import TechnologyTable from './TechnologyTable';
import { useGetDseCardQuery } from 'shared/api/foreignAPI';

const DseCard: React.FC = () => {
    let { id } = useParams();

    const { data: dse, isLoading: isLoadingDse } = useGetDseCardQuery({ id: id }, { pollingInterval: 5000 })
    const { data: userArray, isLoading: isLoadingUser } = useGetUsersQuery('')

    if (isLoadingDse || isLoadingUser) {
        return (
            <Card><p>Загрузка...</p></Card>
        )
    }

    return (
        <div>
            {dse && <DseTable dse={dse}/>}
            {userArray && <TechnologyTable dse={dse} userArray={userArray}/>}
        </div>
    )
}

export default DseCard