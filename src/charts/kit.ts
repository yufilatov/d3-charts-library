let SEQUENCE_ID = 0;
export function nextId() {
    return SEQUENCE_ID += 1;
}

export function elementsFromPoint(x: number, y: number): Element[] {
    if (document.elementsFromPoint) {
        return document.elementsFromPoint(x, y);
    }

    if ((document as any).msElementsFromPoint) {
        return (document as any).msElementsFromPoint(x, y);
    }

    const parents = [];
    const pointerEvents = [];

    let parent = document.elementFromPoint(x, y) as any;
    while (parent) {
        parents.push(parent);
        pointerEvents.push(parent.style.pointerEvents);
        parent.style.pointerEvents = 'none';

        const nextParent = document.elementFromPoint(x, y);
        parent = nextParent === parent ? null : nextParent;
    }

    for (let i = 0, length = parents.length; i < length; i = i + 1) {
        parents[i].style.pointerEvents = pointerEvents[i];
    }

    return parents;
}

const EPSILON = Number.EPSILON;
export class ChartMath {
    static equals(x: number, y: number) {
        return Math.abs(x - y) < EPSILON;
    }

    static less(x: number, y: number) {
        return !this.equals(x, y) && x < y;
    }

    static greater(x: number, y: number) {
        return !this.equals(x, y) && x > y;
    }

}

export function hasParent(parent, node) {
    let target = node;
    while (target.parent) {
        if (parent === target.parent) {
            return true;
        }

        target = target.parent;
    }

    return false;
}

export function findDescendants(node) {
    const result = [];
    if (node) {
        if (node.children) {
            node.children
                .forEach((n) => {
                    result.push(n);
                    result.push(...findDescendants(n));
                });
        }

        return result;
    }
}
