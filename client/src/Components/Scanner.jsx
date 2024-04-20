import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function ScanQR() {
  const [scanResult, setScanResult] = useState("");
  const [num, setNum] = useState("");
  const [conflict, setConflict] = useState(false);

  const manualEntry = async () => {
    await axios
      .post("http://localhost:3000/api/user/markAttendance", {
        regNo: `${num}`,
      })
      .then(function (response) {
        // window.alert(response.data); // Display response data
        console.log(response);
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        window.alert("!error!");
        window.location.reload();
      });
    setScanResult("");
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success, error);

    async function success(result) {
      var num = result;
      scanner.clear();
      setScanResult(num);
      await axios
        .post("http://localhost:3000/api/user/markAttendance", {
          regNo: `${result}`,
        })
        .then(function (response) {
          // window.alert(response.data); // Display response data
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          window.alert("!error!");
        });
    }
    function error(err) {
      console.log(err);
      window.alert(err);
      window.location.reload();
    }
  }, []);

  return (
    <>
      <div className="flex justify-center h-screen items-center bg-gray-100 dark:bg-gray-800">
        {scanResult ? ( {}
        ) : (
          <div
            id="reader"
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg"
          ></div>
        )}
      </div>
      <div className="flex justify-center  items-center bg-gray-100 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Enter the Registration Number"
          onChange={() => {
            setNum(this.target.value);
          }}
        ></input>
        <button
          className="text-black bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={manualEntry}
        >
          Mark
        </button>
      </div>
    </>
  );
}
