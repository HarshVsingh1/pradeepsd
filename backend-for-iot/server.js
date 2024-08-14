const fs = require('fs');
const path = require('path');
const SerialPort = require('serialport');

// Replace with the appropriate serial port path
const serialPort = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
});

// Open the serial port
serialPort.open((err) => {
  if (err) {
    console.error('Error opening serial port:', err);
    return;
  }

  console.log('Serial port opened');

  // Read the audio file
  const audioFilePath = path.join(__dirname, 'audiofile.wav');
  fs.readFile(audioFilePath, (err, audioData) => {
    if (err) {
      console.error('Error reading audio file:', err);
      return;
    }

    // Split the audio data into chunks and send to the Arduino
    const chunkSize = 512; // 512 bytes
    const chunks = [];
    for (let i = 0; i < audioData.length; i += chunkSize) {
      chunks.push(audioData.slice(i, i + chunkSize));
    }

    // Send the audio data chunks to the Arduino
    let chunkIndex = 0;
    const sendChunk = () => {
      if (chunkIndex < chunks.length) {
        serialPort.write(chunks[chunkIndex], (err) => {
          if (err) {
            console.error('Error writing to serial port:', err);
            return;
          }
          chunkIndex++;
          setTimeout(sendChunk, 0); // Send the next chunk with a minimal delay
        });
      } else {
        console.log('Audio data sent to Arduino');
        serialPort.close();
      }
    };

    sendChunk();
  });
});