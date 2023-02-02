import React from "react";

const Row = (props) => {

    let symbol = "";

    if (props.currency.symbol == "&#36;") {
        symbol = "$";
    } else if (props.currency.symbol == "&pound;") {
        symbol = "£";
    } else {
        symbol = "€";
    }

  return (
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-normal">
          {props.currency.code}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-normal">
          {props.currency.description}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-normal">
          {symbol}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-normal">
          <a className="text-green-600 " href="#">
            {props.currency.rate}
          </a>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-normal">
          <a className="text-red-500 " href="#">
            {props.currency.rate_float}
          </a>
        </td>
      </tr>
  );
};

export default Row;
