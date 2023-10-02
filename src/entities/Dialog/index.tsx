import { useState } from 'react'
import Modal from '../../shared/ui/Modal/Modal'


const Dialog = ({ title, handleAction,states, columns, Child, icon, label }: any) => {
  const [modal, setModal] = useState(false)
  return (
    <div style={{ display: "inline-block", flexDirection:"row" }}>
      <Child icon={icon} onClick={() => setModal(true)}>{label}</Child>
      {modal && <Modal columns={columns} closeModal={setModal} title={title} handleAction={handleAction} states={states}/>}
    </div>
  )
}

export default Dialog