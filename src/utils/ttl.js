export function createTtl(ttl) {
    const date = new Date();
    return date.getTime() + ttl;
}

export function isExpire(ttl) {
    const date = new Date();
    return ttl < date.getTime();
}