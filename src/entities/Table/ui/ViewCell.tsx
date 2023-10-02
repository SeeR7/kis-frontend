import { Link } from 'react-router-dom';
import Dialog from 'entities/Dialog';
import IconButton from 'entities/IconButton';
import { ReactComponent as EditIcon } from 'shared/assets/edit.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/delete.svg'
import { getDeepValue } from '../lib/getDeepValue';


function isDate(sDate:any) {  
  if(sDate.toString() == parseInt(sDate).toString()) return false; 
  var tryDate = new Date(sDate);
  return (tryDate && tryDate.toString() != "NaN" && tryDate.toString() != "Invalid Date");  
}

const ViewCell = ({ numerable, data, columns, count, setToggle, fullState, handleDelete }: any) => {
  return (
    <tr key={data.id}>
      {numerable && <td key={"count"}>{count}</td>}
      {columns.map(({ value, accessor, type, selectData, link, addLink, label, accFrom }: any) => {
        if (accessor && accessor.includes("none") && !value)
        {
          return (null)
        }
        let tData = getDeepValue(data, accessor)
        if (value){
          tData = value
        }
        if (type === '/' && getDeepValue(data, accFrom)) {
          if (isDate(getDeepValue(data, accFrom))){
            tData = tData + " / " + new Date(getDeepValue(data, accFrom)).toLocaleDateString("ru")
          }
          else {
            tData = tData + " / " + getDeepValue(data, accFrom)
          }
          
        }
        
        if (link && addLink) {
          if (label === "Деталь") {
            return <td  key={accessor} style={{ textAlign: "initial" }}><Link to={'/tasks/agregat/dse/' + data.spec.childId} className='nav-link text-light'><div style={{ fontWeight: (data.spec.child.zagType === 'У' || data.spec.child.zagType === 'А' ? "bold" : "normal"), marginLeft: (data.level * 15).toString() + "px" }}>{data.spec.child.dseCode}</div></Link></td>
          }
          return <td  key={accessor}><Link to={link + getDeepValue(data, addLink)} className='nav-link text-light'>{tData}</Link></td>
        }
        if (accessor === "full-action") {
          return (
            <td key={accessor}>
              <IconButton icon={EditIcon} onClick={() => {
                setToggle({ item: data.id, toggle: false })
                fullState(data)
              }} />
              <Dialog title={"Подтвердите удаление"} states={data} handleAction={handleDelete} Child={IconButton} icon={DeleteIcon} />
            </td>
          )
        }
        if (accessor === "only-edit"){
          return (
            <td key={accessor}>
              <IconButton icon={EditIcon} onClick={() => {
                setToggle({ item: data.id, toggle: false })
                fullState(data)
                console.log(data)
              }} />
            </td>
          )
        }
        if (selectData) {
          
          return <td key={accessor}>{
            selectData.map((item:any)=> {
              if (item.value === tData) {
                return item.label
              }
            })
          }</td>
        }
        if (type === "date") {
          tData = new Date(tData).toLocaleDateString("ru")
          if (tData === '01.01.1970') tData = null
          return <td key={accessor}>{tData}</td>
        }
        if (accessor ){
          return <td key={accessor}>{tData}</td>;
        }
        
        
      })}
    </tr>
  )
}

export default ViewCell