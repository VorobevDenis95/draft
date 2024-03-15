import { CitiesProps } from "../../shared/types/types";

const DropdownListOfHints = ({list} : CitiesProps) => {
  return (
    list && list.map(el=> (
       <span key={el.id}>{el.name}</span>
     ))
    
  )
}

export default DropdownListOfHints;