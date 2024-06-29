import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [formState, setFormState] = useState({
        crimetype: '',
        location: '',
        time: '',
        description: '',
        media: null
    });
    const [step, setStep] = useState(0);

    const questions = [
        "What type of crime you want to report?",
        "Where did the crime take place?",
        "At what time did it occur? (e.g., 2024-06-29 14:30)",
        "Please provide a description of the crime.",
        "Do you have any photo to upload? (optional)"
    ];

    // Add initial message when component mounts
    useEffect(() => {
        setMessages([{ text: questions[0], sender: 'bot' }]);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        // Process the input based on the current step
        handleInput(input);
    };

    const handleInput = (input) => {
        switch (step) {
            case 0:
                setFormState({ ...formState, crimetype: input });
                break;
            case 1:
                setFormState({ ...formState, location: input });
                break;
            case 2:
                setFormState({ ...formState, time: input });
                break;
            case 3:
                setFormState({ ...formState, description: input });
                break;
            case 4:
                if (input.trim().toLowerCase() !== 'no') {
                    setFormState({ ...formState, media: input });
                }
                break;
            default:
                break;
        }

        if (step < questions.length - 1) {
            setStep(step + 1);
            setMessages(prevMessages => [...prevMessages, { text: questions[step + 1], sender: 'bot' }]);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        // Simulate a backend call
        const response = await mockBackendCall(formState);
        setMessages([...messages, { text: "Report submitted successfully!", sender: 'bot' }]);
        console.log(response);
    };

    const mockBackendCall = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Submitted: ${JSON.stringify(data)}`);
            }, 1000);
        });
    };

    return (
        <div className="chatbot">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <div>
                    <br/><button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
