import React from "react";
import { useRef } from "react";
import confetti from "canvas-confetti";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";

const OTP = "123456";
const length = 6;
export default function App() {
  const inputRef = useRef([]);
  const [otp, setOtp] = useState([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);
  useEffect(() => {
    const value = otp.join("");
    if (value.length === length) {
      if (value === OTP) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast("Mã OTP chính xác");
      } else {
        toast("Mã OTP không chính xác");
      }
    }
  }, [otp]);

  const handleKeyDown = (e, index) => {
    if (e.key.length === 1 && !/^\d$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").trim();

    const newOtp = Array(length).fill("");
    paste.split("").forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(paste.length, length - 1);
    inputRef.current[nextIndex].focus();
  };

  const handleValue = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form className="flex items-center">
        <div className="flex">
          <input
            ref={(el) => (inputRef.current[0] = el)}
            value={otp[0]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 0)}
            onKeyDown={(e) => {
              handleKeyDown(e, 0);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition first:rounded-l-md"
          />

          <input
            ref={(el) => (inputRef.current[1] = el)}
            value={otp[1]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 1)}
            onKeyDown={(e) => {
              handleKeyDown(e, 1);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition"
          />

          <input
            ref={(el) => (inputRef.current[2] = el)}
            value={otp[2]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 2)}
            onKeyDown={(e) => {
              handleKeyDown(e, 2);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition last:rounded-r-md"
          />
        </div>

        <span className="text-gray-500 text-3xl font-bold mx-2">-</span>

        <div className="flex">
          <input
            ref={(el) => (inputRef.current[3] = el)}
            value={otp[3]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 3)}
            onKeyDown={(e) => {
              handleKeyDown(e, 3);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition first:rounded-l-md"
          />

          <input
            ref={(el) => (inputRef.current[4] = el)}
            value={otp[4]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 4)}
            onKeyDown={(e) => {
              handleKeyDown(e, 4);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition"
          />

          <input
            ref={(el) => (inputRef.current[5] = el)}
            value={otp[5]}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleValue(e, 5)}
            onKeyDown={(e) => {
              handleKeyDown(e, 5);
            }}
            className="relative w-14 h-14 bg-transparent border border-gray-700 text-white text-xl text-center -ml-px focus:outline-none hover:border-gray-400 focus:border-gray-400 hover:z-10 focus:z-10 transition last:rounded-r-md"
          />
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
