function getTime(value) {
    const date = value ? new Date(value) : new Date();
    return date.getTime();
}

function createCursor(date = getTime(), id = Number.MAX_SAFE_INTEGER) {
    return {
        date,
        id
    };
}

function base64Decode(obj) {
    return JSON.parse(Buffer.from(obj, 'base64').toString());
}

function base64Encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
}

async function paginateByDateAndId({ dataSource, method, args = [], first, after }) {
    const startFrom = after ? base64Decode(after) : createCursor();
    args.push(first + 1);
    args.push(startFrom);

    let nodes = await dataSource[method].apply(dataSource, args);

    const hasMore = nodes.length > first;
    if (hasMore) {
        nodes = nodes.slice(0, first);
    }

    const lastItem = nodes.slice(-1)[0];
    const cursor = lastItem ? createCursor(getTime(lastItem.date), lastItem.id) : createCursor(0, 0);

    return {
        cursor: base64Encode(cursor),
        hasMore,
        nodes
    }
};

module.exports = {
    paginateByDateAndId
};