const express = require('express');
const app = express();
const cors = require('cors');
const listRouter = require('./routes/list');

app.use(cors());
app.use('/api/lists', listRouter);
app.use(express.static('build'));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});