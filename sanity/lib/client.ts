import { createClient, type QueryParams } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const sanityImageUrlBuilder = imageUrlBuilder(client);

export const buildSanityImageUrl = (
  image: SanityImageSource,
  options?: {
    height?: number;
    width?: number;
  },
) =>
  sanityImageUrlBuilder
    .image(image)
    .height(options?.height ?? 256)
    .width(options?.width ?? 256);

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
