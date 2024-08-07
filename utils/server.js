const os = require('os')

exports.GetServerUsage = () => {
  // Get CPU usage
  const cpus = os.cpus()
  let user = 0
  let nice = 0
  let sys = 0
  let idle = 0
  let irq = 0
  let total = 0

  for (let cpu of cpus) {
    user += cpu.times.user
    nice += cpu.times.nice
    sys += cpu.times.sys
    idle += cpu.times.idle
    irq += cpu.times.irq
  }

  total = user + nice + sys + idle + irq

  const cpuUsage = {
    user: ((user / total) * 100).toFixed(2),
    system: ((sys / total) * 100).toFixed(2),
    idle: ((idle / total) * 100).toFixed(2)
  }

  // Get memory usage
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()
  const usedMemory = totalMemory - freeMemory

  const memoryUsage = {
    total: (totalMemory / (1024 * 1024)).toFixed(2) + ' MB',
    used: (usedMemory / (1024 * 1024)).toFixed(2) + ' MB',
    free: (freeMemory / (1024 * 1024)).toFixed(2) + ' MB',
    usage: ((usedMemory / totalMemory) * 100).toFixed(2) + '%'
  }

  return { cpuUsage, memoryUsage }
}

exports.GetServerEndpoints = () => {
  return [{
      url: "/api/{{activeApiVersion}}/clinical-data/composite/ingest",
      method: "POST",
      description: "Is used to save/post data to the server, without having to wait for the processed response. In Ideal case the Processing should run later on the ingested data.",
      schema: {
        "clinical_data": {
           "HEART_RATE": {
              "uom": "beats/min",
              "data": [
                 {
                    "on_date": "2020-10-06T06:48:17.503000Z",
                    "measurement": "111"
                 }
              ],
              "name": "Heart Rate"
           },
           "WEIGHT": {
              "uom": "Kg",
              "name": "Weight"
           },
           "BLOOD_GLUCOSE_LEVELS": {
              "uom": "mmol/L",
              "name": "Blood Glucose"
           },
           "HEIGHT": {
              "uom": "cm",
              "name": "Height"
           },
           "BP": {
              "uom": "mmHg",
              "name": "Blood Pressure"
           },
           "STEPS": {
              "uom": "",
              "data": [
                 {
                    "on_date": "2020-10-05T13:00:00.000000Z",
                    "measurement": "11031"
                 }
              ],
              "name": "Steps"
           }
        },
        "patient_id": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
        "from_healthkit_sync": true,
        "orgId": "8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3",
        "timestamp": "2020-10-09T05:36:31.381Z"
     }
    },{
      url: "/api/{{activeApiVersion}}/clinical-data/composite/process",
      method: "POST",
      description: "Is used to process data to the server, without having to wait for the server to save the data. The server will process the data saving asynchronously after generating and sending the desired response to the client.",
      schema: {
        "clinical_data": {
           "HEART_RATE": {
              "uom": "beats/min",
              "data": [
                 {
                    "on_date": "2020-10-06T06:48:17.503000Z",
                    "measurement": "111"
                 }
              ],
              "name": "Heart Rate"
           },
           "WEIGHT": {
              "uom": "Kg",
              "name": "Weight"
           },
           "BLOOD_GLUCOSE_LEVELS": {
              "uom": "mmol/L",
              "name": "Blood Glucose"
           },
           "HEIGHT": {
              "uom": "cm",
              "name": "Height"
           },
           "BP": {
              "uom": "mmHg",
              "name": "Blood Pressure"
           },
           "STEPS": {
              "uom": "",
              "data": [
                 {
                    "on_date": "2020-10-05T13:00:00.000000Z",
                    "measurement": "11031"
                 }
              ],
              "name": "Steps"
           }
        },
        "patient_id": "gk6dhgh-9a60-4980-bb8b-787bf82689d7",
        "from_healthkit_sync": true,
        "orgId": "8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3",
        "timestamp": "2020-10-09T05:36:31.381Z"
     }
    }
  ]
}
