const fetch = require('node-fetch');

exports.handler = async (event) => {
    const API_KEY = process.env.OPENAI_API_KEY;

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { prompt, max_tokens } = JSON.parse(event.body);

        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens,
            }),
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
