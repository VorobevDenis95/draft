import { useEffect, useState } from "react";
import { ItemRoutes, initResponseRoutes } from "../routes/typesRoutes";
import {ResponseRoutes} from '../routes/typesRoutes'
import { getRoute } from "../../shared/api/serviceApi";

const DirectRouteContainer = () => {
  const [response, setResponce] = useState<ResponseRoutes>(initResponseRoutes);

  useEffect(() => {
    (async () => {
      const data = await getRoute();
      if (data) setResponce(data);
      console.log(response);
    })() 
}, [])

  return (
    <>
      <div className="direct-route__item">
        <div className="direct-route__header">
          <img src="" alt="" />
          <span className="direct-route__header__icon-train"></span>
          123
        </div>
        <div className="direct-route-main">

        </div>
      </div>
    </>
  )
}

export default DirectRouteContainer;