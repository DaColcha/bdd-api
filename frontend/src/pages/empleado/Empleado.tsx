import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./empleado.scss"

const Empleado = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="empleado">
      <Single {...singleUser}/>
    </div>
  )
}

export default Empleado