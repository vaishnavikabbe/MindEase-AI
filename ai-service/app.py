from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

# AI Response System
class MentalHealthAI:
    def __init__(self):
        self.responses = {
            'sad': [
                "I hear that you're feeling sad. Remember that emotions are temporary. Would you like to try a breathing exercise? 🌸",
                "It's okay to not be okay. You're stronger than you think. I'm here for you. 💙",
                "Would you like to talk more about what's making you feel sad? Sometimes sharing helps lighten the load."
            ],
            'stressed': [
                "Take a deep breath. Let's break down what's overwhelming you. You don't have to figure it all out at once. 🧘",
                "Stress is tough, but you've handled difficult days before. Let's take it one step at a time.",
                "Would you like to try a quick 30-second relaxation exercise with me?"
            ],
            'anxious': [
                "Anxiety can be overwhelming. Let's ground ourselves together. Name 3 things you can see right now. ✨",
                "You are safe in this moment. Take a slow breath in... and out. You've got this.",
                "Would you like to try a guided meditation to help calm your mind?"
            ],
            'happy': [
                "That's wonderful! Remember this feeling. You deserve moments of joy and peace. 🌟",
                "I'm so glad to hear you're feeling happy! What's contributing to your good mood today?",
                "Happiness looks good on you! Let's keep this positive energy flowing."
            ],
            'tired': [
                "Rest is productive too. Your mind and body need time to recharge. Take a break if you can. 💤",
                "Feeling tired is a sign that you've been working hard. Be kind to yourself.",
                "Would you like some tips for better sleep and energy management?"
            ],
            'study': [
                "Break your study into 25-minute focused sessions with 5-minute breaks. You can do this! 📚",
                "Remember to take regular breaks and stay hydrated while studying.",
                "What subject are you studying? Maybe I can help you break it down into smaller tasks."
            ]
        }
        
        self.breathing_exercise = {
            'title': '4-7-8 Breathing Technique',
            'steps': [
                '1. Inhale quietly through your nose for 4 seconds',
                '2. Hold your breath for 7 seconds',
                '3. Exhale completely through your mouth for 8 seconds',
                '4. Repeat 3-5 times'
            ]
        }
        
        self.mood_suggestions = {
            'sad': ['Watch a funny video', 'Call a friend', 'Go for a short walk', 'Write in a journal'],
            'stressed': ['Take 5 deep breaths', 'Listen to calm music', 'Step away for 5 minutes', 'Drink water slowly'],
            'anxious': ['Name 5 things you can see', 'Touch 4 different textures', 'Listen for 3 sounds', 'Notice 2 smells'],
            'tired': ['Take a power nap (15-20 min)', 'Stretch your body', 'Get some fresh air', 'Drink cold water'],
            'happy': ['Share your happiness', 'Do something creative', 'Help someone else', 'Write down what made you happy']
        }

    def get_response(self, message):
        message_lower = message.lower()
        
        # Check for keywords
        for key in self.responses:
            if key in message_lower:
                return random.choice(self.responses[key])
        
        # Check for exercises
        if 'breathe' in message_lower or 'breathing' in message_lower:
            return f"Let's try the {self.breathing_exercise['title']}:\n" + "\n".join(self.breathing_exercise['steps'])
        
        if 'meditate' in message_lower or 'meditation' in message_lower:
            return "Let's do a quick 1-minute meditation: Close your eyes, focus on your breath, and let thoughts pass like clouds. 🌤️"
        
        # Default response
        default_responses = [
            "Thank you for sharing. I'm here to listen without judgment. How can I support you today? 💙",
            "I appreciate you opening up. Would you like to talk more or try a quick mindfulness exercise?",
            "You're doing great by reaching out. Remember that small steps lead to big changes. 🌱"
        ]
        return random.choice(default_responses)
    
    def analyze_mood(self, mood):
        suggestions = self.mood_suggestions.get(mood, ['Take care of yourself', 'Be kind to your mind'])
        return {
            'mood': mood,
            'suggestions': suggestions,
            'affirmation': self.get_affirmation(mood)
        }
    
    def get_affirmation(self, mood):
        affirmations = {
            'sad': "This feeling will pass. You are resilient.",
            'stressed': "You've overcome challenges before. You can handle this.",
            'anxious': "You are safe. You are capable. You are enough.",
            'tired': "Rest is not lazy. You deserve to recharge.",
            'happy': "You are worthy of joy and peace.",
            'default': "You matter. Your feelings are valid. You are not alone."
        }
        return affirmations.get(mood, affirmations['default'])

# Initialize AI
ai = MentalHealthAI()

# Routes
@app.route('/')
def home():
    return jsonify({'message': 'MindEase AI Service is running! 🧠', 'status': 'ready'})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        ai_response = ai.get_response(user_message)
        return jsonify({'response': ai_response})
    except Exception as e:
        return jsonify({'response': "I'm here for you. Please try again. 💙"})

@app.route('/analyze-mood', methods=['POST'])
def analyze_mood():
    try:
        data = request.json
        mood = data.get('mood', '')
        result = ai.analyze_mood(mood)
        return jsonify(result)
    except Exception as e:
        return jsonify({'suggestions': ['Take a deep breath', 'You are doing great']})

@app.route('/breathing-exercise', methods=['GET'])
def breathing_exercise():
    return jsonify(ai.breathing_exercise)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'AI Service is running! 🧠', 'message': 'Ready to support you'})

if __name__ == '__main__':
    print("🤖 MindEase AI Service Started!")
    print("📍 Running on http://localhost:5001")
    print("💙 Ready to support users")
    app.run(host='0.0.0.0', port=5001, debug=True)