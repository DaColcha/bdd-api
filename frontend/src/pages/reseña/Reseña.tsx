import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./reseña.scss"

const Reseña = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="reseña">
      <Single {...singleUser}/>
    </div>
  )
}

export default Reseña