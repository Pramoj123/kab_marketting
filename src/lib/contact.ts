/** What the general Message us button says. */
export const ENQUIRY_MESSAGE = 'Hi! I have a question';

/** The Instagram profile if there is one, otherwise the first profile, otherwise nothing. */
export function instagramProfile(profiles: string[]) {
  return profiles.find((url) => url.includes('instagram.com')) ?? profiles[0];
}
