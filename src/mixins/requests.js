export default {
    methods: {
      async postRequest(url, payload, headers) {
        const response = await fetch(
          url, //connection string
          {
            method: 'POST', //defining method
            headers:headers,
            body: payload, //seding payload to API
          }
        )
        return await response.json()
      },
      async getRequest(url, headers) {
        const response = await fetch(
          url, //connection string
          {
            method: 'GET', //defining method
            headers: headers,
          }
        )
        return await response.json()
      },
      async getRequestRaw(url, headers) {
        const response = await fetch(
          url, //connection string
          {
            method: 'GET', //defining method
            headers: headers,
          }
        )
        return await response
      },
      async putRequest(url, payload, headers) {
        const response = await fetch(
          url, //connection string
          {
            method: 'PUT', //defining method
            headers:headers,
            body: JSON.stringify(payload), //seding payload to API
          }
        )
        return await response.json()
      },
      async deleteRequest(url, headers) {
        const response = await fetch(
          url, //connection string
          {
            method: 'DELETE', //defining method
            headers:headers, //seding payload to API
          }
        )
        return await response.json()
      },
    },
  }
  