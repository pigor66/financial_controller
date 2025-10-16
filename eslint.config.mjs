import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts'
    ]
  },
  {
    rules: {
      // Permite 'any' em casos específicos (pode ser refinado depois)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Permite variáveis não utilizadas se começarem com _
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      // Hook dependencies como warning ao invés de error
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];

export default eslintConfig;
