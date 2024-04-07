import { useState, useEffect } from "react";
import "../css/TopicsOfInterest.css";

function TopicsOfInterest() {
  const topicArray = [
    "Sports",
    "Technology",
    "AI",
    "Dance",
    "Music",
    "Party",
    "Travel",
    "Dogs",
    "Cooking",
    "Fashion",
    "Gaming",
    "Fitness",
    "Literature",
    "Science",
    "Gardening",
    "Photography",
  ];

  const [topics, setTopics] = useState(topicArray);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopicInput, setNewTopicInput] = useState(""); // State to store the value of the new topic input field

  useEffect(() => {
    console.log(selectedTopics);
  }, [selectedTopics]);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopics((currentSelectedTopics) => {
      if (currentSelectedTopics.includes(topic)) {
        return currentSelectedTopics.filter((t) => t !== topic);
      } else {
        return [...currentSelectedTopics, topic];
      }
    });
  };

  const handleNewTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTopicInput) {
      setSelectedTopics((currentSelectedTopics) => [
        ...currentSelectedTopics,
        newTopicInput,
      ]);
      setTopics((currentTopics) => [...currentTopics, newTopicInput]);
      setNewTopicInput(""); // Clear the input field after submit
    }
  };

  return (
    <div>
      <h1>Select some topics of your interest</h1>
      <div className="topics-container">
        <div className="topics">
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleSelectTopic(topic)}
              className={selectedTopics.includes(topic) ? "selected" : ""}
            >
              {topic}
            </button>
          ))}
        </div>
        <form onSubmit={handleNewTopic}>
          <label htmlFor="newtopic">
            <input
              type="text"
              id="newtopic"
              value={newTopicInput}
              onChange={(e) => setNewTopicInput(e.target.value)}
            />
            <input type="submit" />
          </label>
        </form>
      </div>
    </div>
  );
}

export default TopicsOfInterest;
