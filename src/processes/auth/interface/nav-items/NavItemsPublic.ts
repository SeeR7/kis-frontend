import {ReactComponent as MonitorIcon} from 'shared/assets/monitor.svg'
import {ReactComponent as TaskIcon} from 'shared/assets/tasks.svg'
import {ReactComponent as MessengerIcon} from 'shared/assets/messenger.svg'

export const NavItemsPublic = [
    {
        id: 0,
        icon: MonitorIcon,
        label: 'Главная',
        route: '/monitor',
    },
    {
        id: 1,
        icon: TaskIcon,
        label: 'Задачи',
        route: '/tasks',
    },
    {
        id: 2,
        icon: MessengerIcon,
        label: 'Сообщения',
        route: '/messenger',
    },
]