export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-02';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_SANITY_DATASET,
  'Missing environment variable for dataset'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
  'Missing environment variable for projectId'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
