import { io } from 'socket.io-client';
import readline from 'readline';

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmZkYzI0LWQ1MjktNGQ1ZC1hYjAxLTlhMDUxZjNhMDQyMiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzUzNDY5MTM5LCJleHAiOjE3NTM0NzI3Mzl9.JVKZYFTYlflc1fmZRlPPXpqiZvkVlOx9vSEzvPKJhqc';
const toUserId = 'a2650585-a068-4b1d-b239-8edca10c7e7a';

let currentChatId = null;

const socket = io('http://localhost:3000', {
	auth: { token },
});

socket.on('connect', () => {
	console.log('✅ Connected as:', socket.id);

	socket.emit('startChat', { toUserId }, (res) => {
		if (res?.error) {
			console.error('❌ Chat start error:', res.error);
			process.exit(1);
		}

		currentChatId = res.chatId;
		console.log(`💬 Chat started with chatId: ${currentChatId}`);
		console.log('📝 You can now type messages below:');
	});
});

socket.on('receiveMessage', (msg) => {
	console.log(`📩 [${msg.senderId}] ${msg.text}`);
});

socket.on('connect_error', (err) => {
	console.error('❌ Connection error:', err.message);
});

socket.on('disconnect', (reason) => {
	console.warn('🔌 Disconnected:', reason);
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'You: ',
});

rl.prompt();

rl.on('line', (line) => {
	const text = line.trim();
	if (!text || !currentChatId) {
		return rl.prompt();
	}

	socket.emit('sendMessage', {
		chatId: currentChatId,
		text,
	});

	rl.prompt();
});

rl.on('close', () => {
	console.log('\n👋 Exiting...');
	process.exit(0);
});
