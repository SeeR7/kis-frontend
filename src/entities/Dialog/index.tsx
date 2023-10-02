import React, { useState } from 'react'
import Button from 'shared/ui/Button'
import Card from 'shared/ui/Card'
import Modal from './Modal'


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