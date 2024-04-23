import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode"; // Assuming you have it installed
import axios from "axios";

export default function ScanQR() {
  const [scanResult, setScanResult] = useState("");
  const [num, setNum] = useState("");
  const [conflict, setConflict] = useState(false);
  const scannerRef = useRef(null); // Create a ref to hold the scanner instance

  const manualEntry = async () => {
    await axios
      .post("http://localhost:3000/api/user/markAttendance", {
        regNo: `${num}`,
      })
      .then(function (response) {
        // window.alert(response.data); // Display response data
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        window.alert("!error!");
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
    scannerRef.current = scanner; // Store the scanner instance in the ref

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
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          window.alert("error! Scan again");
        });
      window.location.reload(); // Reload to reset state (optional)
    }

    function error(err) {
      // console.log(err);
      // window.alert(err);
    }

    // Cleanup function to stop the scanner when the component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          console.log("Camera stopped successfully");
        }).catch((err) => {
          console.error("Error stopping camera:", err);
        });
      }
    };
  }, []);

  return (
    <>
    
      <div className="flex justify-center h-screen items-center z-11">
        {scanResult ? (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Registration Number: 
            </h1>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {scanResult}
            </p>
          </div>
        ) : (
          <div id="reader" className="bg-white rounded-lg shadow-lg"></div>
        )}
      </div>
      {/* <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Enter the Registration Number"
          onChange={(e) => setNum(e.target.value)}
        />
        <button
          className="text-black bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={manualEntry}
        >
          Mark Attendance
        </button>
      </div> */}
    </>
  );
}
