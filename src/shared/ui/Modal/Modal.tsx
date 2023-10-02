import { useState } from 'react'
import Button from 'shared/ui/Button'
import Input from 'shared/ui/Input'
import Select from 'shared/ui/Select'

const Modal = ({ title, closeModal, states, columns, handleAction }: any) => {
  const [state, setState] = useState(states)
  const [error, setError] = useState("")

  const changeState = (accessor: any, e: any) => {
    let nextState = { ...state }
    nextState[accessor] = e.target.value
    setState(nextState)
    setError("")
  }

  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='modal-title'>
          <h2 className='title'>{title}</h2>
        </div>
        <div className='modal-body'>
          <p></p>
          {columns && columns.map((item: any) => {
            if (item.accessor != 'full-action') {
              if (!item.selectData) {
                return (<div  key={item.accessor}>
                  <p>{item.label}</p>
                  <Input
                    key={item.accessor}
                    placeholder={"..."}
                    value={state[item.accessor]}
                    type={item.type}
                    onChange={(e: any) => changeState(item.accessor, e)}
                  /></div>
                )
              }
              else {
                return (<div style={{width:'210px'}} key={item.accessor}>
                <p>{item.label}</p>
                  <Select key={item.accessor}
                    data={item.selectData}
                    onChange={(e: any) => changeState(item.accessor, e)}
                    >
                    {state[item.accessor]}
                  </Select>
                </div>)
              }
            }
          })}
        </div>
        <div style={{width:"100%", color:"red"}}>{error}</div>
        <div className='modal-footer'>
          <Button onClick={() => {
            handleAction(state, setError, closeModal)
          }}>ОК</Button>
          <Button onClick={() => {closeModal(false)}}>Отмена</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal