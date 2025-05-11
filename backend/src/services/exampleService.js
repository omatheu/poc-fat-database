const Example = require('../models/exampleModel');

class ExampleService {
  async getExample() {
    try {
      // Implement your business logic here
      return { message: 'Example service working' };
    } catch (error) {
      throw new Error('Error in getExample service');
    }
  }

  async createExample(data) {
    try {
      // Implement your business logic here
      return { message: 'Example created', data };
    } catch (error) {
      throw new Error('Error in createExample service');
    }
  }
}

module.exports = new ExampleService(); 