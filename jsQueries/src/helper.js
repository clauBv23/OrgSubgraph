function recursiveLog(obj, depth = 0) {
  // Iterate over each property of the object
  for (let key in obj) {
      // Check if the property is an object itself
      if (typeof obj[key] === 'object') {
          // Log the key and depth
          console.log(`${' '.repeat(depth * 2)}${key}:`);
          // Recursively call the function with the nested object and increment depth
          recursiveLog(obj[key], depth + 1);
      } else {
          // Log the key and value
          console.log(`${' '.repeat(depth * 2)}${key}: ${obj[key]}`);
      }
  }
}


module.exports = {
  recursiveLog}