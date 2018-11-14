/*
  taken from https://davidwalsh.name/watch-object-changes

  watches when an object state changes and then triggers given callback
   the problem is that it updates regardless if the property actually changed or not
*/
const onChange = (object, callback) => {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      callback();
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty(target, property) {
      callback();
      return Reflect.deleteProperty(target, property);
    }
  };

  return new Proxy(object, handler);
};

export default onChange;
