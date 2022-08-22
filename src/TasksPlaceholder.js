export default function TasksPlaceholder() {

    const quotes = [
        {quote: "“Focus on being productive instead of busy.”", author: "Tim Ferriss"},
        {quote: "“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.”", author: "Stephen King"},
        {quote: "“If you spend too much time thinking about a thing, you'll never get it done.”", author: "Bruce Lee"},
        {quote: "“Simplicity boils down to two steps: Identify the essential. Eliminate the rest.”", author: "Leo Babauta"},
        {quote: "“DO IT. DO IT NOW!”", author: "Arnold Schwarzenegger"},
        {quote: "“Great acts are made up of small deeds.”", author: "Lao Tzu"},
        {quote: "“Many a false step was made by standing still.”", author: "Fortune cookie"},
        {quote: "“Inspiration is perishable, act on it immediately.”", author: "Naval Ravikant"},
        {quote: "“The fool is always getting ready to live.”", author: "Seneca"},
        {quote: "“It always seems impossible until it’s done.”", author: "Nelson Mandela"},
    ];

    const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

    return(
        <div className="placeholder-quote">
            <p className="quote">{randomQuote.quote}</p>
            <p>— {randomQuote.author}</p>
        </div>
    );
}