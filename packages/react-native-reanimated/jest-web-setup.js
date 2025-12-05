const { Platform } = require('react-native');

Platform.OS = 'web';
Platform.select = jest.fn((spec = {}) => spec.web ?? spec.default);
