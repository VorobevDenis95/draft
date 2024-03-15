import { useState, useMemo} from "react";
import { months } from "./utils";
import './Datepicker.css';
import {CoordinatesProps} from '../Input/DateInput'

interface DatePickerProps {
  value: Date;
  coordinates: CoordinatesProps;
  onChange: (value: Date) => void;
  onClickDate: (value: boolean) => void;

  min?: Date;
  max?: Date;
}

interface DateCellItem {
  day: number,
  month:number,
  year: number,
  hidden?: boolean;

  dayOfWeek?: number,

  isToday?: boolean,
  isSelected?: boolean,
}

// const todayDay = new Date();

const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setMinutes(-1);
  return nextMonthDate.getDate();
}

const getDaysPrevMonth = (year: number, month: number) => {
  let currentYear = year;
  let currentMonth = month - 1;
  if (currentMonth === -1) {
    currentMonth = 11;
    currentYear = year - 1;
  } 
  const lastDateMonth = getDaysAmountInAMonth(currentYear, currentMonth);
  
  return {day: lastDateMonth, month: currentMonth, year: currentYear};
}

const getDaysNextMonth = (year: number, month: number) => {
  let currentYear = year;
  let currentMonth= month + 1;
  if (currentMonth === 12) {
    currentMonth = 0;
    currentYear = year + 1;
  } 
  return {day: 1, month: currentMonth, year: currentYear}; 
}

const getPreviousMonthDays = (year: number, month: number) => {
  const cellsPreviousDays: DateCellItem[] = [];
  const day = new Date(year, month, 1);
  
  let dayWeek= day.getDay();
  if (dayWeek === 0) dayWeek = 7;
  if (dayWeek === 1) return cellsPreviousDays;
  const date = getDaysPrevMonth(year, month);
  dayWeek = (7- (8 - dayWeek));
  for (let i = dayWeek - 1; i >= 0; i = i -1) {
    const currentDate: DateCellItem = {...date};
    currentDate.day = currentDate.day - i;
    currentDate.hidden = true;
    cellsPreviousDays.push(currentDate);
  }
  return cellsPreviousDays;
}

const getNextMonthDays = (year: number, month: number) => {
  const cellsNextMonthDays: DateCellItem[] = [];
  const day = new Date(year, month, getDaysAmountInAMonth(year, month));
  let dayWeek= day.getDay();
    
  if (dayWeek === 0) return cellsNextMonthDays 
  else dayWeek = 7 - dayWeek;

  const date = getDaysNextMonth(year, month);
  for (let i = 0; i < dayWeek; i++) {
    const currentDate: DateCellItem = {...date};
    currentDate.day = currentDate.day + i;
    currentDate.hidden = true;
    cellsNextMonthDays.push(currentDate);
  }
  return cellsNextMonthDays;
}

const getCurrentMonthDays = (year: number, month: number, numberOfDays: number) => {
  const dateCells: DateCellItem[] = [];
  for (let i = 1; i <= numberOfDays; i++) {
    const date = {
      day: i,
      month: month,
      year: year
    }
    dateCells.push(date);
  }
  return dateCells;
}

const getAllCells = (year: number, month: number) => {
  return [...getPreviousMonthDays(year, month), 
  ...getCurrentMonthDays(year, month, getDaysAmountInAMonth(year, month)),
  ...getNextMonthDays(year, month)
  ]
}

const DatePicker = ({value, coordinates,  onChange, onClickDate} : DatePickerProps) => {
  const [panelYear, setPanelYear] = useState(value.getFullYear());
  const [panelMonth, setPanelMonth] = useState(value.getMonth());
  // const calendar = useRef<HTMLDivElement>(null);
  
  const CalendarStyles = {
    top: `${coordinates.y + coordinates.height}px`,
    left: `${coordinates.x}px`,
  }
  
  // const [dateInput, setDateInput] = useState('');
  // const [isActive, setActive] = useState(false);


  // const [day, month, year, cells ] = useMemo(() => {
  //   const currentYear = value.getFullYear();
  //   const currentDay = value.getDate();
  //   const currentMount = months[value.getMonth()];
  //   const cells = getAllCells(currentYear, value.getMonth())
  //   console.log(cells);
  //   return [currentDay, currentMount, currentYear, cells]
  // }, [value]);

  // const values = useMemo(() => {

  // }, []);

  const dateCells = useMemo(() => {
    const items: DateCellItem[] = getAllCells(panelYear, panelMonth);
    return items;
  }, [panelYear, panelMonth]);


  const onDateSelect = (dateCells: DateCellItem) => {
    // const option = {
    //   minimumIntegerDigits: 2
    // }
    // setDateInput(`${dateCells.day
    //   .toLocaleString('ru', option)}.${(dateCells.month + 1)
    //     .toLocaleString('ru', option )}.${(dateCells.year - 2000)
    //       .toLocaleString('ru', option)}`);
    // setActive(false);
    onChange(new Date(dateCells.year, dateCells.month, dateCells.day));
    onClickDate(false);
  };
  
  // const nextYear = () => {}

  // const prevYear = () => {}

  // const clickDateInput = () => {
  //   isActive ? setActive(false) : setActive(true); 
  // }

  const nextMonth = () => {
    if (panelMonth === 11) {
      setPanelMonth(0);
      setPanelYear(panelYear + 1);
    } else {
      setPanelMonth(panelMonth + 1);
    }
  }

  const prevMonth = () => {
    if (panelMonth === 0) {
      setPanelMonth(11);
      setPanelYear(panelYear - 1);
    } else {
      setPanelMonth(panelMonth - 1);
    }
  }

  return (
    <>
      {/* <input type="text" 
      onClick={clickDateInput}
      readOnly 
      value={dateInput}
      placeholder="ДД/ММ/ГГ" required/> */}
      

      { 
              <div className="calendar"
              style={CalendarStyles}
              >
                <div className="calendar__header">
                  <button type='button' className='calendar__btn' onClick={prevMonth}>◂</button>
                  <span className="calendar__header-month" >{months[panelMonth]}</span>
                  <button type="button" className='calendar__btn' onClick={nextMonth}>▸</button>
                </div>
          <div className="calendar__container">
      
            {
              dateCells.map(el => (
                <div key={`${el.day}${el.month}${el.year}`}
                onClick={() => onDateSelect(el)} 
                className={`calendar__container-item ${el.hidden 
                  ? 'calendar__item__hidden' : '' }`}>{el.day}</div>
              ))
            }
            </div>
      
            </div>
      }
    </>
  )
}

export default DatePicker;