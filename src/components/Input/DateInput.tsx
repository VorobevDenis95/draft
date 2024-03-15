import { useEffect, useRef, useState } from "react";
import DatePicker from "../Datepicker/Datepicker";
import { getCurrentDate } from "./utils";


export interface CoordinatesProps {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface InputProps {
  nameClass: string;
}



const DateInput = ({nameClass }: InputProps) => {

  // const coordinateInit: CoordinatesProps = {
  //   x: 0,
  //   y: 0,
  //   height:0,
  //   width: 0
  // }

  const [date, setDate] = useState<Date>();
  const [isDatepicker, setActiveDatePicker] = useState(false);
  const myInput  = useRef<HTMLInputElement>(null);
  const [coordinates, setСoordinates] = useState<CoordinatesProps>();
  const currentDate = date ? date : new Date();

  useEffect(() => {
    const el = myInput.current?.getBoundingClientRect();
    console.log(el)
    if (el) {
      const {x, y, height, width}  = el;
      setСoordinates({
        x, y, height, width
      })
    } 
    
  }, [])

  const dateClick = () => {
    console.log(myInput.current);
    isDatepicker ? setActiveDatePicker(false) 
    : setActiveDatePicker(true);
  }




  return (
    <>
    <input className={nameClass} type="text" 
    ref={myInput}
    onClick={dateClick}
    placeholder="ДД.ММ.ГГ"
    defaultValue={date 
      ? getCurrentDate(date)
      : '' }
    required/>
    {
      isDatepicker && 
      <DatePicker value={currentDate}
      coordinates={coordinates as CoordinatesProps}  
      onClickDate={setActiveDatePicker}
      onChange={setDate}/>
    }
    </>

  )
}

export default DateInput;