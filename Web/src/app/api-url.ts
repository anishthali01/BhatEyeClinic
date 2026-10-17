const configuredApiUrl = document.querySelector<HTMLMetaElement>('meta[name="api-base-url"]')?.content;

export const apiBaseUrl = (configuredApiUrl || 'http://localhost:5021/api').replace(/\/+$/, '');