const mild = [
    "Turns out, my code is an acquired taste. 🍷 Check out Roast-My-GitHub!",
    "My repo got a gentle roast. More of a warm toast, really. 🍞 Check out Roast-My-GitHub!",
];

const medium = [
    "My code has more spaghetti than an Italian restaurant. 🍝 Check out Roast-My-GitHub!",
    "I thought I was a developer. Turns out, I'm a bug breeder. 🐛 Check out Roast-My-GitHub!",
];

const extreme = [
    "My repo is so bad, even AI refuses to debug it. 🤖💀 Check out Roast-My-GitHub!",
    "My code is proof that the universe is constantly expanding… with bugs. 🌌 Check out Roast-My-GitHub!",
];

export function getTweetEndings(roastLevel: string): string {
    if (roastLevel === "mild") {
        return mild[Math.floor(Math.random() * mild.length)];
    } else if (roastLevel === "medium") {
        return medium[Math.floor(Math.random() * medium.length)];
    }
    return extreme[Math.floor(Math.random() * extreme.length)];
}
