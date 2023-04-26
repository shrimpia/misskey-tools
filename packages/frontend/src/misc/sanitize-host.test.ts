import { expect, test } from 'vitest';

import { sanitizeHost } from '@/misc/sanitize-host.js';


test('正常系：@lutica@mk.shrimpia.network をパースできる', () => {
  expect(sanitizeHost('@lutica@mk.shrimpia.network'))
    .toBe('mk.shrimpia.network');
});

test('正常系：lutica@mk.shrimpia.network をパースできる', () => {
  expect(sanitizeHost('lutica@mk.shrimpia.network'))
    .toBe('mk.shrimpia.network');
});

test('正常系：@lutica@localhost:3000 をパースできる', () => {
  expect(sanitizeHost('@lutica@localhost:3000'))
    .toBe('localhost:3000');
});

test('正常系：https://mk.shrimpia.network をパースできる', () => {
  expect(sanitizeHost('https://mk.shrimpia.network'))
    .toBe('mk.shrimpia.network');
});

test('正常系：https://mk.shrimpia.network/ をパースできる', () => {
  expect(sanitizeHost('https://mk.shrimpia.network/'))
    .toBe('mk.shrimpia.network');
});

test('正常系：http://localhost:3000 をパースできる', () => {
  expect(sanitizeHost('http://localhost:3000'))
    .toBe('localhost:3000');
});

test('正常系：localhost:3000/ をパースできる', () => {
  expect(sanitizeHost('localhost:3000/'))
    .toBe('localhost:3000');
});

test('異常系：「あいうえお」 がエラーを返す', () => {
  expect(() => sanitizeHost('あいうえお'))
    .toThrow('URL not detected');
});

test('異常系：空文字がエラーを返す', () => {
  expect(() => sanitizeHost(''))
    .toThrow('URL not detected');
});

test('異常系：nullがエラーを返す', () => {
  expect(() => sanitizeHost(null as any))
    .toThrow('URL not detected');
});

test('異常系：undefinedがエラーを返す', () => {
  expect(() => sanitizeHost(undefined as any))
    .toThrow('URL not detected');
});
