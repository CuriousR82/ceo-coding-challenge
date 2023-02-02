import React, { useState, useEffect } from "react";
// import "./App.css";
import Row from "./Row";

function App() {

  // Setting states for currencies
  const [loading, setLoading] = useState(true);
  const [timeData, setTimeData] = useState(null);
  const [USD, setUSD] = useState(null);
  const [EUR, setEUR] = useState(null);
  const [GBP, setGBP] = useState(null);

  // States used for various SORT options
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  // Stats of the SORT dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Fetches new data when requested through the refresh button
  const fetchNewData = () => {
    fetchData();
  };

  // Updates currencies and the time
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.coindesk.com/v1/bpi/currentprice.json`
      );
      const data = await res.json();

      setUSD(data.bpi.USD);
      setEUR(data.bpi.EUR);
      setGBP(data.bpi.GBP);

      setFirst(data.bpi.USD);
      setSecond(data.bpi.EUR);
      setThird(data.bpi.GBP);

      // Test
      // console.log(data.bpi.USD.code);
      // console.log(data.bpi.EUR);
      // console.log(data.bpi.GBP);

      setTimeData(data.time);
      setLoading(false); 
    } catch (error) {
      console.log("Failed to fetch new data from Coindesk", error);
    }
  };

  // Fetches data once mounted
  useEffect(() => {
    fetchData();
  }, []);

  // Sorts and assigns states based on the chosed sort method
  const handleOptionClick = (event) => {
    // Test
    // console.log(event.target.textContent);
    const currCode = [USD.code, EUR.code, GBP.code];
    const currNum = [USD.rate, EUR.rate, GBP.rate];

    const currCodeMap = {
      [USD.code]: USD,
      [EUR.code]: EUR,
      [GBP.code]: GBP,
    };

    const currNumMap = {
      [USD.rate]: USD,
      [EUR.rate]: EUR,
      [GBP.rate]: GBP,
    };

    if (event.target.textContent === "A-Z") {
      const currSort1 = currCode.sort().map(code => currCodeMap[code]);
      currSort1.forEach((value, index) => {
        if (index === 0) {
          setFirst(value);
        } else if (index === 1) {
          setSecond(value);
        } else if (index === 2) {
          setThird(value);
        }
      });      
    } 
    else if (event.target.textContent === "Z-A") {
      const currSort2 = currCode.sort().reverse().map(code => currCodeMap[code]);
      currSort2.forEach((value, index) => {
        if (index == 0) {
          setFirst(value);
        } else if (index == 1) {
          setSecond(value);
        } else if (index == 2) {
          setThird(value);
        }
      });   
    } 
    else if (event.target.textContent === "$$$") {
      const currSort3 = currNum.sort().reverse().map(num => currNumMap[num]);
      currSort3.forEach((value, index) => {
        if (index === 0) {
          setFirst(value);
        } else if (index === 1) {
          setSecond(value);
        } else if (index === 2) {
          setThird(value);
        }
      });
    } 
    else {
      const currSort4 = currNum.sort().map(num => currNumMap[num]);
      currSort4.forEach((value, index) => {
        if (index === 0) {
          setFirst(value);
        } else if (index === 1) {
          setSecond(value);
        } else if (index === 2) {
          setThird(value);
        }
      });
    } 
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      {loading ? (
        <></>
      ) : (
        <div className="overflow-hidden m-auto h-fit">
          
          <div className="flex flex-col">

            {/* dropdown, refresh, date */}
            <div className="">
              <div className="min-w-full flex flex-row p-1.5 inline-block align-middle">

                {/* REFRESH BUTTON (new data) */}
                <div className="bg-blue-800 hover:bg-blue-400 overflow-hidden border rounded-lg px-3 py-2 text-sm text-sm">
                  <button
                    className="text-xs font-bold text-white"
                    onClick={fetchNewData}
                  >
                    {" "}
                    ↻{" "}
                  </button>
                </div>

                {/* TIME LAST UPDATED */}
                <div className="ml-2 mr-2 overflow-hidden border rounded-lg px-3 py-2 text-sm text-sm">
                  <div>{timeData.updated}</div>
                </div>

                {/* DROPDOWN */}
                <div className="relative">
                  <button
                    className="flex items-center px-6 py-3 text-xs text-white font-bold bg-blue-800 border rounded-lg hover:bg-blue-400 focus:outline-none focus:shadow-outline"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    SORT
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div className="py-1 rounded-md bg-white shadow-xs">

                        {/* ALPHABETICAL ORDER (A-Z) */}
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleOptionClick}
                        >
                          A-Z
                        </a>

                        {/* ALPHABETICAL ORDER (Z-A) */}
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleOptionClick}
                        >
                          Z-A
                        </a>

                        {/* NUMERICAL ORDER ($$$-$) */}
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleOptionClick}
                        >
                          $$$
                        </a>

                        {/* NUMERICAL ORDER ($$$-$) */}
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleOptionClick}
                        >
                          $
                        </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* TABLE */}
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Code
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Symbol
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Rate_float
                      </th>
                    </tr>
                  </thead>
                  
                  {/* ROWS */}
                  <tbody className="divide-y divide-gray-200">
                    <Row currency={first} />
                    <Row currency={second} />
                    <Row currency={third} />
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
