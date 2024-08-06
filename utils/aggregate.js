// Utility for aggregating Heart Rate Data
exports.aggregateHeartRateData = async (heartRateData) => {
  // Do any pre-processing of data, like filtering null value etc

  // Sort the data by on_date
  heartRateData.sort((a, b) => a.on_date - b.on_date);

  // Initialize the output array and the current interval, starting with empty interval
  let output = [];
  let currentInterval = null;

  for (let data of heartRateData) {
    // Calculate the start of the current 15-minute interval
    let intervalStart = new Date(data.on_date);
    intervalStart.setMinutes(Math.floor(intervalStart.getMinutes() / 15) * 15, 0, 0);

    // If this is a new interval, finalize the previous interval and start a new interval
    if (!currentInterval || currentInterval.startTime.getTime() !== intervalStart.getTime()) {
      if (currentInterval) {
        currentInterval.endTime = new Date(currentInterval.startTime.getTime() + 15 * 60 * 1000);
        currentInterval.measurements.average /= currentInterval.measurements.count;
        output.push(currentInterval);
      }

      currentInterval = {
        startTime: intervalStart,
        endTime: new Date(intervalStart.getTime() + 15 * 60 * 1000),
        measurements: {
          low: data.measurement,
          high: data.measurement,
          average: data.measurement,
          count: 1
        }
      };
    } else {
      // Otherwise, update the current interval measurements for high low and average
      currentInterval.measurements.low = Math.min(currentInterval.measurements.low, data.measurement);
      currentInterval.measurements.high = Math.max(currentInterval.measurements.high, data.measurement);
      currentInterval.measurements.average += data.measurement;
      currentInterval.measurements.count++;
    }
  }

  // Finalize the last interval, when there is no next record to process
  if (currentInterval) {
    currentInterval.endTime = new Date(currentInterval.startTime.getTime() + 15 * 60 * 1000);
    currentInterval.measurements.average /= currentInterval.measurements.count;
    output.push(currentInterval);
  }

  return output;
}