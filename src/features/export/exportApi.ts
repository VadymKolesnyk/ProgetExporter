export interface Card {
    resourceType: 'Bug' | 'UserStory' | 'Feature',
    id: number,
    name: string
}

export async function loadReleaseEntity(token: string, cardNumber: string) {
    const response = await fetch(`https://cors-anywhere-ten-zeta.vercel.app/smartwebs.tpondemand.com/api/v2/Release/${cardNumber}?` + new URLSearchParams({
        select: '{bugs, userstories, features}',
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
        },
        features: {
            items: Card[]
        }
    };
}

export async function loadEntity(token: string, type: 'Bug' | 'UserStory' | 'Feature' , cardNumber: string) {
    const response = await fetch(`https://cors-anywhere-ten-zeta.vercel.app/smartwebs.tpondemand.com/api/v2/${type}/${cardNumber}?` + new URLSearchParams({
        select: '{assignments:assignments.select({generalUser.fullName,roleName:role.name})}',
        access_token: token,
    }), {
        method: 'GET'
    });
    return (await response.json()).items[0] as {
        assignments: {
            fullName: string,
            roleName: string
        }[]
    };
}