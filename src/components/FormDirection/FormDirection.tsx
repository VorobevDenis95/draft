const FormDirection = () => {
  return (
    <form className="form-direction">
      <span className="form-direction__title">
        Направление
      </span>
      <div className="form-direction__direction-container">
        <input type="text" placeholder="Откуда" />
        <input type="text" placeholder="Куда" />
      </div>
      <span className="form-direction__title">
        Дата
      </span>
      <div className="form-direction__date-container">
        {/* <DatePicker />
        <DatePicker /> */}
      </div>
    </form>
  )
}

export default FormDirection;