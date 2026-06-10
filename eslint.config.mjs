import nextConfig from 'eslint-config-next'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  // Ignore legacy source files superseded by the Next.js migration
  {
    ignores: [
      'components.jsx',
      'tweaks-panel.jsx',
      'listings-data.js',
      'image-slot.js',
    ],
  },
  ...nextConfig,
  ...nextTypescript,
  // @next/next/no-page-custom-font targets Pages Router; App Router uses <link> in layout.tsx
  {
    files: ['app/layout.tsx'],
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
]

export default config
