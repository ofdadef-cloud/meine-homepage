import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/sanity/lib/env'

export default defineCliConfig({
  api: {
    projectId: projectId ?? 'placeholder',
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './src/sanity/schemaTypes',
    generates: './sanity.types.ts',
  },
})
