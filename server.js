const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/collect', async (req, res) => {
    try {
        const payload = req.body;
        const formatted = `[Data Received]\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``;

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: formatted,
            parse_mode: 'Markdown'
        });

        res.status(200).json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));