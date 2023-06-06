import { base } from "$app/paths"

export type ItemOrigin = 'guide' | 'tutorial' | 'blog' | null

export interface ItemJSON {
    headerName: string
    filePath: string
    subItems: ItemJSON[]
    origin: ItemOrigin
}

export class Item implements ItemJSON {
    headerName: string
    filePath: string
    subItems: Item[]
    origin: ItemOrigin

    constructor(headerName: string = "", filePath: string = "", subItems: Item[] = [], origin: ItemOrigin = null) {
        this.headerName = headerName
        this.filePath = filePath
        this.subItems = subItems
        this.origin = origin
    }

    static flatten(items: Item[]): Item[] {
        for (const item of items) {
            if (item.subItems)
                items = items.concat(Item.flatten(item.subItems))
            item.subItems = []
        }

        return items.flat();
    }

    toJSON(): ItemJSON {
        return {
            headerName: this.headerName,
            filePath: this.filePath,
            subItems: this.subItems.map(v => v.toJSON()),
            origin: this.origin
        }
    }
}
JSON.stringify(new Item())

export interface IndexItem {
    title: string,
    filePath: string,
    items: IndexItem[]
}

export function parseFromIndex(indexItems: IndexItem[], origin: ItemOrigin): Item[] {
    if (!indexItems)
        return []

    const items: Item[] = []

    for (let i = 0; i < indexItems.length; i++) {
        const element = indexItems[i]

        items.push(new Item(
            element.title,
            `${base}/docs/${origin as string}/${element.filePath}`,
            parseFromIndex(element.items, origin),
            origin)
        )
    }

    return items
}