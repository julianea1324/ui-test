import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const DateText = (date, category) => {
  const [message, setMessage] = useState("");
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);
  useEffect(() => {
    let today = new Date();
    let past = new Date(date);
    var diff = Math.floor(today.getTime() - past.getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    if (days < 31) setMessage(`${days} days ago in ${categoryName}`);
    else if (months < 12) setMessage(`${months} months ago in ${categoryName}`);
    else if(months > 12 ) setMessage(` ${years} years ago in ${categoryName}`)
    else setMessage('Thank you for your vote!');
  }, [date, categoryName]);
  return message;
};
