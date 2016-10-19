import React from 'react';
import ReactDOM, { render } from 'react-dom';

import App from './components/app';

// const createStoreWithMiddleware = applyMiddleware()(createStore);
window.generate = function generate(count) {
  // generate
  var records = [];
  var fname = ['Vitali', '~Katsia', 'John', 'Peter', '#Sue', '$Olivia', '<Thomas', '>Sergei', 'Snehal', 'Avinash', 'Divia'];
  var lname = ['Peterson', 'Rene', 'Johnson-Petrov-Sannikov-Ivanov-Smirnov', 'Cuban', 'Twist', 'Sidorov', 'Vasiliev', 'Yadav', 'Vaishnav'];
  // add records
  for (var i = 0; i < count * 1000; i++) {
    records.push({
      recid: i + 1,
      personid: i + 1,
      fname: fname[Math.floor(Math.random() * fname.length)],
      lname: lname[Math.floor(Math.random() * lname.length)],
      email: 'vm@gmail.com',
      sdate: '1/1/2013',
      manager: '--'
    });
  }
  console.log(records);
  ReactDOM.render(<App width={600} height={568} header="List of Names" showFooter={true}
    showToolbar={true} name="grid" records={records} />, document.getElementById('app'));
};

generate(25);