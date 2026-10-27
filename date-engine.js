/* Calendar-date-only calculations; never add 24-hour milliseconds. */
(function(root){
'use strict';
function validDate(s){if(typeof s!=='string'||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(s))return false;const [y,m,d]=s.split('-').map(Number);if(y<1||y>9999||m<1||m>12||d<1||d>31)return false;const dt=new Date(0);dt.setFullYear(y,m-1,d);dt.setHours(12,0,0,0);return dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d}
function todayLocal(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function addCalendarDays(s,days){if(!validDate(s)||!Number.isInteger(days)||days<0||days>3650)throw Error('Invalid date or calendar-day rule.');const [y,m,d]=s.split('-').map(Number);const dt=new Date(0);dt.setFullYear(y,m-1,d+days);dt.setHours(12,0,0,0);return [dt.getFullYear(),String(dt.getMonth()+1).padStart(2,'0'),String(dt.getDate()).padStart(2,'0')].join('-')}
function formatDate(s,fmt){if(!validDate(s))return '—';return fmt==='YYYY-MM-DD'?s:s.slice(8,10)+'/'+s.slice(5,7)+'/'+s.slice(0,4)}
root.DateEngine={validDate,todayLocal,addCalendarDays,formatDate};
})(typeof window==='undefined'?globalThis:window);
