import React, { useEffect } from 'react';
import axios from 'axios'

const Test = () => {
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:5000/api/v1/appointments/search?appointment_id=1',
      headers:
      {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },

    })
      .then(result => {
        console.log(result.data)

      })
  })

  return (
    <h1>Test</h1>
  )
}

export default Test