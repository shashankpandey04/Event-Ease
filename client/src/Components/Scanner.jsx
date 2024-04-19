import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function ScanQR() {
  const [scanResult, setScanResult] = useState("");



  useEffect( () => {

    

    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    async function success (result) {
      var num = result;
      scanner.clear();
      setScanResult(num);
      await axios
        .post("http://localhost:3000/api/user/markAttendance", {
          regNo:`${result}`
        })
        .then(function (response) {
          // window.alert(response.data); // Display response data
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          window.alert("!error!");
        });
      setScanResult("");
    }
  
    function error (err) {
      // console.warn(err);
    }

  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-gray-100 dark:bg-gray-800">
      {scanResult ? (
        <div> Success! The registration number is: {scanResult} </div>
      ) : (
        <div
          id="reader"
          className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg"
        ></div>
      )}
    </div>
  );
}
