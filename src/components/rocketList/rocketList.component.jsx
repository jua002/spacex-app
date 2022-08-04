import axios from "axios";
import { useState, useEffect } from "react";
import "./rocketList.styles.css";

const RocketList = () => {
  //   const url = "https://api.spacexdata.com/v4/rockets";
  const [rocketServiceData, setRocketServiceData] = useState([]);
  const [launchData, setLaunchData] = useState([]);

  const getNasaData = () => {
    let endpoint = [
      "https://api.spacexdata.com/v4/rockets",
      "https://api.spacexdata.com/v5/launches",
    ];

    Promise.all(endpoint.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: rockets }, { data: launches }]) => {
        setRocketServiceData(rockets);
        setLaunchData(launches);
      }
    );
  };

  useEffect(() => {
    getNasaData();
  }, []);

  console.log(rocketServiceData);
  console.log(launchData);

  return (
    <div className="rocket-container">
      <table>
        <caption> List of Rockets</caption>
        <thead>
          <tr>
            <th> Rocket ID </th>
            <th> Rocket Name </th>
            <th> Cost per launch </th>
            <th> Success Rate % </th>
            <th> First Flight </th>
          </tr>
        </thead>
        <tbody>
          {rocketServiceData.map((rocket) => (
            <tr key={rocket.id}>
              <td>{rocket.id} </td>
              <td>{rocket.name} </td>
              <td>${rocket.cost_per_launch} </td>
              <td>{rocket.success_rate_pct}% </td>
              <td>{rocket.first_flight} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RocketList;
