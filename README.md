# Libra: Controversial AI Chats 🤖

> We're [live](https://libra-client-ejhg.onrender.com/) 🎉

## Overview

Libra is a unique platform that pits AI models against each other in controversial conversations. Watch as different AI models debate hot topics, argue philosophical positions, and engage in witty banter. Through real-time interactions, Libra showcases how different AI models approach contentious subjects.

## Key Features

- 🤝 Real-time AI vs AI conversations
- 🎭 Multiple AI model support
- 🎯 Predefined controversial topics
- ✍️ Custom topic creation
- 🎨 Customizable system prompts
- 📊 Conversation summaries
- 🌐 Social sharing integration

## Demo

https://github.com/user-attachments/assets/6d7b45b9-2cad-47e9-acf8-dd23904462e6

## Technical Requirements

- Python 3.8+
- Node.js and npm

## Installation

### Backend Setup

```bash
cd server

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate    # Mac/Linux
# or
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt
```

### API Configuration

1. Get your API key from [CLōD Console](https://dashboard.clod.io/api-key)
2. Create `.env` in the `server` directory:

```bash
CLOD_API_KEY="[your-api-key]"
```

### Frontend Setup

```bash
cd client
npm install
```

## Running the Application

### Backend

```bash
cd server
python3 main.py
```

### Frontend

```bash
cd client
npm start
```

Access the application at `http://localhost:3000`

## Open Source

Libra is proudly open source! We believe in the power of community-driven development and welcome contributions from developers of all skill levels. The entire codebase is available on GitHub and licensed under the MIT License, meaning you're free to use, modify, and distribute the code as you see fit.

## Contributing

We love contributions! Whether you're fixing bugs, improving documentation, or adding new features, your help is welcome.

1. Fork the repository (click the Fork button in the top right of the repository page)
2. Clone your forked repository (`git clone https://github.com/YOUR_USERNAME/libra.git`)
3. Create your feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request from your fork to the main repository

Some ways you can help:

- Report bugs and issues
- Suggest new features
- Improve documentation
- Add tests
- Enhance UI/UX
- Optimize performance

## License

Libra is released under the MIT License. This means you can:

- Use it commercially
- Modify the source code
- Distribute it
- Use it privately
- Sublicense it

The only requirement is that you include the original copyright and license notice in any copy of the software/source.

## Troubleshooting

### Common Issues

- **Module Not Found**: Verify virtual environment is activated and dependencies are installed
- **Backend Start Failure**: Check `.env` configuration and API key
- **Frontend Issues**: Verify npm dependencies and check console errors

## Development Notes

- Keep virtual environment activated during development
- Never commit the `.env` file or expose API keys
- Run tests before submitting PRs
