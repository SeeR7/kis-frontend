import { Link } from 'react-router-dom'

const NavButton = (props:any) => {
    return (
        <li className='nav-button'>
            <Link to={props.route}>
                {<div className='icon'><props.icon /></div>}{props.label}
            </Link>
        </li>
    )
}

export default NavButton