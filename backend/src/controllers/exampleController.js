const exampleService = require('../services/exampleService');

class ExampleController {
  async getExample(req, res) {
    try {
      const result = await exampleService.getExample();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createExample(req, res) {
    try {
      const result = await exampleService.createExample(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ExampleController(); 