/**
 * This test file verifies that web-specific jest config options work as expected.
 * It will only run when the jest config targets '.web.test.ts' files with the 'web' project.
 */

import { Platform } from 'react-native';

describe('Web-specific Jest Config Options', () => {
  describe('jsdom Test Environment', () => {
    test('should have jsdom test environment available (window object exists)', () => {
      // This verifies jsdom is being used as the test environment
      expect(typeof window).toBe('object');
      expect(window).toBeDefined();
    });

    test('should have document object available', () => {
      // jsdom provides the document object for DOM testing
      expect(typeof document).toBe('object');
      expect(document).toBeDefined();
    });

    test('should support DOM manipulation', () => {
      // Test basic DOM operations that only work in jsdom environment
      const div = document.createElement('div');
      div.textContent = 'Test content';

      expect(div.textContent).toBe('Test content');
      expect(div.tagName).toBe('DIV');
    });

    test('should have localStorage available', () => {
      // jsdom provides localStorage API
      expect(typeof localStorage).toBe('object');
      expect(localStorage).toBeDefined();

      // Test basic localStorage operations
      localStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');
      localStorage.removeItem('test-key');
    });

    test('should have navigator object', () => {
      // jsdom provides navigator API
      expect(typeof navigator).toBe('object');
      expect(navigator).toBeDefined();
      expect(typeof navigator.userAgent).toBe('string');
    });
  });

  describe('Web-specific Setup Files', () => {
    test('should have Platform.OS set to web', () => {
      // jest-web-setup.js sets Platform.OS to 'web'
      expect(Platform.OS).toBe('web');
    });

    test('should have Platform.select function configured for web', () => {
      // jest-web-setup.js mocks Platform.select to return web-specific values
      const webValue = { web: 'web-value', default: 'default-value' };
      const result = Platform.select(webValue);

      expect(result).toBe('web-value');
    });

    test('should use default value when web is not specified in Platform.select', () => {
      const platformSpec = { default: 'default-value' };
      const result = Platform.select(platformSpec);

      expect(result).toBe('default-value');
    });

    test('should return web value even with other platform keys present', () => {
      const platformSpec = {
        ios: 'ios-value',
        android: 'android-value',
        web: 'web-value',
        default: 'default-value',
      };
      const result = Platform.select(platformSpec);

      expect(result).toBe('web-value');
    });
  });

  describe('Test Path Matching', () => {
    test('should be executed as part of web project', () => {
      // This test should only run for *.web.test.ts files
      // Verify we're in the web project by checking for jest environment indicators
      expect(typeof window).toBe('object');
      expect(Platform.OS).toBe('web');
    });
  });

  describe('Transform and Module Resolution', () => {
    test('should be able to import from package.json', () => {
      // Test that imports work correctly in web environment
      const packageJson = require('../package.json');
      expect(packageJson).toBeDefined();
      expect(packageJson.name).toBeDefined();
    });

    test('should handle module imports correctly', () => {
      // This verifies transformIgnorePatterns and module resolution are working
      expect(() => {
        require('react-native');
      }).not.toThrow();
    });
  });
});
