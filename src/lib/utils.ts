import _ from 'lodash';

export function calculatePrice(quote: number, base: number) {
    return _.round(quote * base, 8);
}

// courtesy of gustf: https://stackoverflow.com/a/35279162
export function levenshtein(s: string, t: string): number {
    if (s === t) {
        return 0;
    }
    let n = s.length,
        m = t.length;
    if (n === 0 || m === 0) {
        return n + m;
    }
    let x = 0,
        y,
        a,
        b,
        c,
        d,
        g,
        h,
        k;
    let p = new Array(n);
    for (y = 0; y < n; ) {
        p[y] = ++y;
    }

    for (; x + 3 < m; x += 4) {
        let e1 = t.charCodeAt(x);
        let e2 = t.charCodeAt(x + 1);
        let e3 = t.charCodeAt(x + 2);
        let e4 = t.charCodeAt(x + 3);
        c = x;
        b = x + 1;
        d = x + 2;
        g = x + 3;
        h = x + 4;
        for (y = 0; y < n; y++) {
            k = s.charCodeAt(y);
            a = p[y];
            if (a < c || b < c) {
                c = a > b ? b + 1 : a + 1;
            } else {
                if (e1 !== k) {
                    c++;
                }
            }

            if (c < b || d < b) {
                b = c > d ? d + 1 : c + 1;
            } else {
                if (e2 !== k) {
                    b++;
                }
            }

            if (b < d || g < d) {
                d = b > g ? g + 1 : b + 1;
            } else {
                if (e3 !== k) {
                    d++;
                }
            }

            if (d < g || h < g) {
                g = d > h ? h + 1 : d + 1;
            } else {
                if (e4 !== k) {
                    g++;
                }
            }
            p[y] = h = g;
            g = d;
            d = b;
            b = c;
            c = a;
        }
    }

    for (; x < m; ) {
        let e = t.charCodeAt(x);
        c = x;
        d = ++x;
        for (y = 0; y < n; y++) {
            a = p[y];
            if (a < c || d < c) {
                d = a > d ? d + 1 : a + 1;
            } else {
                if (e !== s.charCodeAt(y)) {
                    d = c + 1;
                } else {
                    d = c;
                }
            }
            p[y] = d;
            c = a;
        }
        h = d;
    }

    return h;
}
