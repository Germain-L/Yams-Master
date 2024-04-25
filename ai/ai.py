import numpy as np
import socketio
import torch
import torch.nn as nn
import torch.optim as optim
from torch.nn.functional import relu
from collections import deque
import random


class DQN(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 128)
        self.fc3 = nn.Linear(128, output_dim)

    def forward(self, x):
        x = relu(self.fc1(x))
        x = relu(self.fc2(x))
        return self.fc3(x)


class GameEnv:
    def __init__(self, url, agent_id):
        self.sio = socketio.Client()
        self.url = url
        self.agent_id = agent_id
        self.sio.connect(url)
        self.state = np.zeros(25, dtype=np.float32)
        self.reward = 0
        self.done = False
        self.info = {}
        self.turn = False  # Track if it's this agent's turn
        self.sio.on('game.update', self.handle_game_update)

    def handle_game_update(self, data):
        self.state = np.array(data['state'], dtype=np.float32)
        self.reward = data['reward']
        self.done = data['done']
        self.turn = data['turn'] == self.agent_id  # Check if it's this agent's turn
        self.info = data.get('info', {})

    def step(self, action):
        if self.turn:
            self.sio.emit('game.action', {'action': action, 'agent_id': self.agent_id})
        self.sio.sleep(0.1)  # Wait for the response to be handled
        return self.state, self.reward, self.done, self.info

    def reset(self):
        self.sio.emit('game.reset', {'agent_id': self.agent_id})
        self.sio.sleep(0.1)  # Wait for the game to reset
        return self.state

    def close(self):
        self.sio.disconnect()


def train_model():
    env1 = GameEnv('http://localhost:3000', agent_id=1)
    env2 = GameEnv('http://localhost:3000', agent_id=2)
    model1 = DQN(25, 25)
    model2 = DQN(25, 25)
    optimizer1 = optim.Adam(model1.parameters(), lr=0.001)
    optimizer2 = optim.Adam(model2.parameters(), lr=0.001)
    loss_fn = nn.MSELoss()
    replay_buffer = deque(maxlen=10000)
    episodes = 500
    batch_size = 64
    gamma = 0.99

    for episode in range(episodes):
        state1 = env1.reset()
        state2 = env2.reset()
        total_reward = 0
        done = False

        while not done:
            # Player 1's turn
            state_tensor1 = torch.FloatTensor(state1).unsqueeze(0)
            q_values1 = model1(state_tensor1)
            action1 = q_values1.argmax().item() if random.random() > 0.05 else random.randint(0, 24)
            next_state1, reward1, done1, info1 = env1.step(action1)

            # Player 2's turn
            state_tensor2 = torch.FloatTensor(state2).unsqueeze(0)
            q_values2 = model2(state_tensor2)
            action2 = q_values2.argmax().item() if random.random() > 0.05 else random.randint(0, 24)
            next_state2, reward2, done2, info2 = env2.step(action2)

            replay_buffer.append((state1, action1, reward1, next_state1, done1))
            replay_buffer.append((state2, action2, reward2, next_state2, done2))

            state1, state2 = next_state1, next_state2
            total_reward += reward1 + reward2
            done = done1 or done2

            if len(replay_buffer) >= batch_size:
                batch = random.sample(replay_buffer, batch_size)
                train(batch, model1, optimizer1, model2, optimizer2, loss_fn, gamma)

        print(f"Episode {episode + 1}: Total Reward = {total_reward}")

    torch.save(model1.state_dict(), "dqn_model_player1.pth")
    torch.save(model2.state_dict(), "dqn_model_player2.pth")
    env1.close()
    env2.close()


def train(batch, model1, optimizer1, model2, optimizer2, loss_fn, gamma):
    states, actions, rewards, next_states, dones = zip(*batch)

    states = torch.FloatTensor(states)
    actions = torch.LongTensor(actions)
    rewards = torch.FloatTensor(rewards)
    next_states = torch.FloatTensor(next_states)
    dones = torch.FloatTensor(dones)

    current_q_values1 = model1(states).gather(1, actions.unsqueeze(1)).squeeze(1)
    next_q_values1 = model1(next_states).max(1)[0].detach()
    expected_q_values1 = rewards + gamma * next_q_values1 * (1 - dones)

    current_q_values2 = model2(states).gather(1, actions.unsqueeze(1)).squeeze(1)
    next_q_values2 = model2(next_states).max(1)[0].detach()
    expected_q_values2 = rewards + gamma * next_q_values2 * (1 - dones)

    loss1 = loss_fn(current_q_values1, expected_q_values1)
    loss2 = loss_fn(current_q_values2, expected_q_values2)

    optimizer1.zero_grad()
    optimizer2.zero_grad()

    loss1.backward()
    loss2.backward()

    optimizer1.step()
    optimizer2.step()


if __name__ == "__main__":
    train_model()
