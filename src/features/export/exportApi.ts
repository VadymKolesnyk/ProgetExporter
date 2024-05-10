export interface Card {
    resourceType: string,
    id: number,
    name: string
}

export async function loadProgetEntity(token: string, cardType: string, cardNumber: string, select: string) {
    const response = await fetch(`https://smartwebs.tpondemand.com/api/v2/${cardType}/${cardNumber}?` + new URLSearchParams({
        select,
        access_token: token,
    }), {
        method: 'GET'
    });
    return (await response.json()).items[0] as {
        bugs: {
            items: Card[]
        },
        userStories: {
            items: Card[]
        }
    };
}