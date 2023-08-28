// ==UserScript==
// @name         Print Office365 OOO Calendars
// @namespace    https://www.sadan.me/
// @version      1.2
// @description  Prints vacation/sick days into broswer console log. Please pay attention that you need to view the specific weeks in outlook-web in order for the events to be printed.
// @author       Zac Sadan
// @match        https://outlook.office.com/calendar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=outlook.office.com
// @grant        none
// ==/UserScript==
/////////////////////////////////
//------------------------------------------------------
var dates_arr = [];

function printDatesArrToConsoleAsTable()
{
    let minDate = new Date("Jun 01 2100");
    let maxDate = new Date("Jun 01 1900");

    for ( var key in dates_arr )
    {
       var keyDate = new Date(key);
       if ( keyDate > maxDate ) { maxDate = keyDate; }
       if ( keyDate < minDate ) { minDate = keyDate; }
    }

    var currentDate = minDate;
    var tableStr = "";
    while (currentDate <= maxDate )
    {
        var data = "-";
        if(dates_arr[currentDate])
        {
            data = dates_arr[currentDate];
        }
        if(currentDate.getDay() == 0 )
        {
            tableStr = tableStr + "-----------------------------------------------------\n"; // start of week
        }
        if(currentDate.getDate() == 1 )
        {
            tableStr = tableStr + "#####################################################\n"; // start of month
        }
        var curDateStr = currentDate.toString().split(" ").slice(0,4).join(" ") ;
        var weekend_str = " : ";
        if (curDateStr.includes("Fri") || curDateStr.includes("Sat") )
        {
            weekend_str = " : [WEEKEND] ";
        }
        tableStr = tableStr + curDateStr + weekend_str + data + "\n";
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }
    console.log(tableStr);
}

//------------------------------------------------------

function appendAllNewDatesRangeToArray(startDate,endDate,subject)
{
  //console.log(subject+","+startDate.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit",})+","+endDate.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit",}));
  let currentDate = startDate;
  let firstLoop = true;

  while (currentDate < endDate || firstLoop == true)
  {
      firstLoop = false;
      var date_key = currentDate;

      if ( date_key in dates_arr)
      {
          if ( ! dates_arr[date_key].includes(subject) )
          {
             dates_arr[date_key].push(subject);
          }
      }
      else
      {
          dates_arr[date_key] = [];
          dates_arr[date_key].push(subject);
      }
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  }

}

//------------------------------------------------------

function printCalendarTable(body)
{
   for (var key in body.Body.Items)
   {
       // save only calendar events with "OOO"/"Sick" string
       if ( body.Body.Items[key].Subject.toLowerCase().includes("ooo") ||
            body.Body.Items[key].Subject.toLowerCase().includes("sick") )
       {
           appendAllNewDatesRangeToArray(
               new Date(body.Body.Items[key].Start),
               new Date(body.Body.Items[key].End),
               body.Body.Items[key].Subject);
       }
   }
   printDatesArrToConsoleAsTable();
}

//------------------------------------------------------

const {fetch: origFetch} = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);

    // "steal" only requests that has Calendar Events
    if( response.url.search("GetCalendarView") != -1 )
    {
        response
            .clone()
            .json()
            .then(body => printCalendarTable(body))
            .catch(err => console.error(err));
    }
    return response;
};

//------------------------------------------------------
