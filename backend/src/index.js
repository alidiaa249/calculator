const express = require('express');
const cors = require('cors');
const calculator = require('./calculator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Calculator API is running' });
});

// Calculate endpoint
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;

  if (a === undefined || a === null) {
    return res.status(400).json({ error: 'Parameter "a" is required' });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA)) {
    return res.status(400).json({ error: 'Parameter "a" must be a valid number' });
  }

  try {
    let result;

    switch (operation) {
      case 'add':
        result = calculator.add(numA, numB);
        break;
      case 'subtract':
        result = calculator.subtract(numA, numB);
        break;
      case 'multiply':
        result = calculator.multiply(numA, numB);
        break;
      case 'divide':
        result = calculator.divide(numA, numB);
        break;
      case 'percentage':
        result = calculator.percentage(numA);
        break;
      default:
        return res.status(400).json({ error: `Unknown operation: ${operation}` });
    }

    res.json({ result, operation, a: numA, b: numB });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Calculator API running on port ${PORT}`);
  });
}

module.exports = app;
