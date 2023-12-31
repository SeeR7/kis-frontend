import { NavButton, Button } from 'shared'
import {ReactComponent as LogoutIcon} from 'shared/assets/logout.svg'

const Sidebar = (props:any) => {
  return (
    <nav className='nav'>
      <ul className='elems'>
        {props.elems.map((elem:any) => 
          <NavButton route={elem.route} label={elem.label} icon={elem.icon} key={elem.id}/>
         )}
        <hr />
        <Button onClick={props.logoutHandler} icon={LogoutIcon}>Выйти</Button>
      </ul>
    </nav>
  )
}

export default Sidebar