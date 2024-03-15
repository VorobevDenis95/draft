import React, { useEffect, useRef, useState } from "react"
import { InputProps } from "./DateInput"
import { getCities } from "../../shared/api/serviceApi";
import DropdownListOfHints from "./DropdownListOfHints";
import { CitiesProps } from "../../shared/types/types";


const CityInput = ({nameClass}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const [listCities, setListCities] = useState<CitiesProps['list']>([]);

  useEffect(() => {
    if (!inputValue.trim()) return;
  (async () => {
    const data = await getCities(inputValue)
    if (data) {
      const list : CitiesProps['list'] = data;
      setListCities(list);
    }
  }
    )()
    
  }, [inputValue])

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <>
    <input className={nameClass} type="text" required
    value={inputValue} onChange={onChangeValue}
    />
    <DropdownListOfHints list={listCities}/>
  </>
  )
}

export default CityInput