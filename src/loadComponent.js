export async function loadComponent(id, path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Không thể tải ${path}`);
    }

    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}