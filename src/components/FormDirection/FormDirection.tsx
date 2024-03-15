import CityInput from "../Input/CityInput";
import DateInput from "../Input/DateInput";
import './FormDirection.css';

const FormDirection = () => {
  return (
    <form className="form-direction">
      <div className="form-direction__container">
        <div className="form-direction__direction-container">
        <h2 className="form-direction__title">
          Направление
        </h2>
        <div className="form-direction__line">
          <CityInput nameClass='form-direction__city-from' />
          <CityInput nameClass='form-direction__city-to' />

          </div>
        </div>
        <div className="form-direction__direction-container">
        <h2 className="form-direction__title">
          Дата
        </h2>
        <div className="form-direction__line">
          <DateInput nameClass='search-form__input-date-from' />   
          <div className="form-direction__button-container">
          <DateInput nameClass='search-form__input-date-to' />
          <button className="form-direction__submit" 
            type="submit">НАЙТИ НАПРАВЛЕНИЕ</button>

          </div>
        </div>
        </div>
      
     
      </div>

    </form>
  )
}

export default FormDirection;
