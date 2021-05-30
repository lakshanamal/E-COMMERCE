import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import './history.css'
function OrderHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  console.log(history, history.length);

  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>

      <div>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchased</th>
              {/* <th>Payment ID</th> */}
            </tr>
          </thead>
          <tbody>
            {history.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.paymentID}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <Link to={`/history/${item._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
