const HOME_ID = 'home';

export const isHomeId = (id: string) => id === HOME_ID;

/** Content id to route param. The home page has no param, so it serves "/". */
export const pageIdToSlug = (id: string) => (isHomeId(id) ? undefined : id);

export const pageIdToPath = (id: string) => (isHomeId(id) ? '/' : `/${id}/`);
