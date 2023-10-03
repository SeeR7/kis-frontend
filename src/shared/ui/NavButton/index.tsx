import { Link } from 'react-router-dom'

export const NavButton = (props:any) => {
    return (
        <li className='nav-button'>
            <Link to={props.route}>
                {<div className='icon'><props.icon /></div>}{props.label}
            </Link>
        </li>
    )
}