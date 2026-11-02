import { config } from '@keystatic/core';
import { pages, siteSettings } from './src/cms/keystatic/collections';

const repo = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

// Local files in development, GitHub in production. Content branches are limited to "content/".
export default config({
  storage:
    import.meta.env.PROD && repo
      ? { kind: 'github', repo, branchPrefix: 'content/' }
      : { kind: 'local' },
  collections: { pages },
  singletons: { siteSettings },
});
