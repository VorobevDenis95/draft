import {createBrowserRouter, Link, Outlet} from 'react-router-dom'
import TrainSelection from '../Page/TrainSelection/TrainSelection'
import CityInput from '../../components/Input/CityInput'
 


export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
    <Link to="/routes/65f7ee8d3e252100467cb2a3/65f7ee8e3e252100467cb2a4/2024-05-01/2024-05-12" >сюда</Link>
    <Outlet/></div>,
    errorElement: <div>25</div>,
    children: [
      {
        path: '/routes/:from__city/:to__city/:date__start/:date__end',
        element: <TrainSelection/>
      },
    ]
  }
])