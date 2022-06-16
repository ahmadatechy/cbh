const crypto = require("crypto");

exports.deterministicPartitionKeyOld = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

exports.deterministicPartitionKey2 = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  //event not found
  if(!event) return TRIVIAL_PARTITION_KEY;
  
  //define candidate depen on event value
  //step 1 :if event partitionKey found
  /**
   *  //define candidate depen on event value
   *  1 :if event partitionKey found
   *        1.1 : if  type of event.partitionKey!=string => convert it to string
   *        1.2 : if  type of event.partitionKey==string => assign it
   *  2 :if event partitionKey not found => convert event to string and hash it
   */
  let  candidate= event.partitionKey?(typeof event.partitionKey !=="string")?JSON.stringify(event.partitionKey):event.partitionKey
   : crypto.createHash("sha3-512").update( JSON.stringify(event)).digest("hex");

  //check candidate length and hash it if length > MAX_PARTITION_KEY_LENGTH
  return candidate.length > MAX_PARTITION_KEY_LENGTH?crypto.createHash("sha3-512").update(candidate).digest("hex"):candidate;


};