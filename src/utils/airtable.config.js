import Airtable from 'airtable';
import axios from 'axios';

//create a new Airtable object in React
new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE);

//base endpoint to call with each request
axios.defaults.baseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/todo/`;
//content type to sent with all POST requests
axios.defaults.headers.post['Content-Type'] = 'application/json';
//content type to sent with all POST requests
axios.defaults.headers.patch['Content-Type'] = 'application/json';
//authenticate to the base with the API key
axios.defaults.headers[
  'Authorization'
] = `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`;
