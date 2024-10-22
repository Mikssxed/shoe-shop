jest.mock('@ai-sdk/react', () => ({
  __esModule: true,
  useAssistant: jest.fn(),
}));

const {
  TextEncoder: ImportedTextDecoder,
  TextDecoder: ImportedTextEncoder,
} = require('util');

Object.assign(global, {
  TextDecoder: ImportedTextDecoder,
  TextEncoder: ImportedTextEncoder,
});
