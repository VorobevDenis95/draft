import './App.css';
import CityInput from './components/Input/CityInput';
// import Footer from './components/Footer/Footer';
import DateInput from './components/Input/DateInput';

function App() {
  // const [date, setDate] = useState(() => new Date());
  
  // search-form-input__city-from
  // search-form-input__city-to

  return (
    <>
    {/* <Footer /> */}
    <CityInput nameClass='1' />
    <form className='search-form__tickets' >
      <DateInput nameClass='search-form__input-date-from' />   
      <DateInput nameClass='search-form__input-date-to' />
      <button type='submit'>Отправить</button>
    </form>
    </>
  )
}

export default App;
