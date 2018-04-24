interface IRan {
    alpha: string[],
    number: string[],
    symbols: string[]
}

type Key = keyof IRan;

const ran: IRan = {
    alpha: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ],
    number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    symbols: ['_', '-', '$', '!', '%', '?']
};

const defaultKeys: Key[] = ['alpha', 'number', 'symbols'];

export default function generateId(index: number, customKeys?: Key[]): string {
    const keys: string[] = customKeys
        || defaultKeys;
    const customLib: string[] = keys
        .map((a: Key) => ran[a])
        .reduce((a, b) => a.concat(b));
    const n: number = customLib.length;

    let generatedId: string[] = [];

    while (index > 0) {
        generatedId.push(customLib[Math.round(Math.random() * n)]);
        index -= 1;
    }

    return generatedId.join('');
}