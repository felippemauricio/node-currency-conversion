class UnknownValueException extends Error {
  constructor(message = 'Unknown Value') {
    super();
    Object.assign(this, {
      message,
    });
  }
}


module.exports = UnknownValueException;
