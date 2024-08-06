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
      url: "/api/${activeApiVersion}/clinical-data/heartrate/process",
      method: "GET",
      name: "",
      description: "",
      schema: ""
    }
  ]
}
