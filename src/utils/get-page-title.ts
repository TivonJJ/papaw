const title = Settings.title || '';

export default function(pageTitle: string): string {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
