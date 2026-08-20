export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-02-01'

export function assertEnv() {
  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Lege .env.local an und starte Sanity mit: npx sanity init -y --dataset-default --nextjs-add-config-files --nextjs-append-env --nextjs-embed-studio --project-name "meine-homepage"',
    )
  }
}
